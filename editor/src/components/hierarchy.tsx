import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu, Icon } from "antd";
import { EditorContext } from "../context/editor-context";
import { Entity, Camera, RenderObject, Light } from "../../../dist";
import { Tree } from "antd";

const { DirectoryTree, TreeNode } = Tree;

export function Hierarchy()
{
    const editor = useContext(EditorContext);
    const [entities, setEntities] = useState([] as Entity[]);
    useEffect(() =>
    {
        if (!editor)
            return;
        const engine = editor.engine;
        const entityChange = () =>
        {
            setEntities(engine.scene.rootEntities());
        };
        engine.scene.on("entity-add", entityChange);
        engine.scene.on("entity-remove", entityChange);

    }, [editor]);
    const entitiesSelect = (keys: string[]) =>
    {
        if (!editor)
            return;
        const ids = keys.map(key => parseInt(key));
        const entities = editor.engine.scene.entities.filter(entity => ids.includes(entity.assetID));
        editor.selectEntities(entities);
    };
    const renderEntityTreeNode = (entity: Entity, idx: number) => (
        <Tree.TreeNode title={entity.name} key={entity.assetID.toString()} icon={entityIcon(entity)} selectable isLeaf={entity.children.size === 0}>
            {Array.from(entity.children).map((child, idx) => renderEntityTreeNode(child as Entity, idx))}
        </Tree.TreeNode>
    );
    return (
        <Menu mode="inline" defaultOpenKeys={["hierarchy"]}>
            <Menu.SubMenu title="Hierarchy" key="hierarchy" className="hierarchy">
                <div>
                    <Tree.DirectoryTree selectable multiple defaultExpandAll expandAction="doubleClick" onSelect={entitiesSelect}>
                        {entities.map(renderEntityTreeNode)}
                    </Tree.DirectoryTree>
                </div>
            </Menu.SubMenu>
        </Menu>
    );
}

function entityIcon(entity: Entity)
{
    if (entity instanceof Camera)
        return <Icon type="video-camera" />;
    else if (entity instanceof RenderObject)
        return <Icon type="gold" />;
    else if (entity instanceof Light)
        return <Icon type="bulb" />;
    else
        return <Icon type="inbox" />;
}