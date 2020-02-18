import React, { useContext, useState, useEffect } from "react";
import { EditorContext } from "../context/editor-context";
import { Menu, Tree, Icon } from "antd";
import { AssetsFolder, IAssetNode, AssetNode } from "../common/assets/user-assets";
import { IAsset, Mesh, Material, Shader, Texture, Entity, Texture2D, AssetManager } from "zogra-renderer";
import { IconCubeFill, IconPaintBucket, IconCode, IconTextureBox, IconImage, IconPackage } from "./icons";
import { AntTreeNodeMouseEvent } from "antd/lib/tree";
import { AntTreeNodeDropEvent } from "antd/lib/tree/Tree";
const { DirectoryTree, TreeNode } = Tree;

export function AssetsPanel()
{
    const editor = useContext(EditorContext);
    const [, rerender] = useState({});

    useEffect(() =>
    {
        if (!editor)
            return;
        editor.userAssets.on("change", (type, asset, folder) =>
        {
            rerender({});
        });
    }, [editor]);

    if (!editor)
        return null;
    
    const dragStart = (e: AntTreeNodeMouseEvent) =>
    {
        const { event, node } = e;
        const asset = node.props.dataRef as IAssetNode;
        (event as any as DragEvent).dataTransfer?.setData("application/user-asset", asset.path);
        ((event as any as DragEvent).dataTransfer as DataTransfer).dropEffect = "move";
    };
    const drop = (e: AntTreeNodeDropEvent) =>
    {
        const { event, node, dropPosition, dropToGap } = e;
        event.preventDefault();
        let dropNode = node.props.dataRef as IAssetNode;
        if (dropToGap)
            dropNode = dropNode.parent as AssetsFolder;
        if (!(dropNode instanceof AssetsFolder))
        {
            ((event as any as DragEvent).dataTransfer as DataTransfer).dropEffect = "none";
            return;
        }
        if ((event as any as DragEvent).dataTransfer)
        {
            const path = ((event as any as DragEvent).dataTransfer as DataTransfer).getData("application/user-asset");
            const asset = editor.userAssets.find(path);
            if (asset === dropNode)
            {
                ((event as any as DragEvent).dataTransfer as DataTransfer).dropEffect = "none";
                return;
            }
            if (asset)
            {
                ((event as any as DragEvent).dataTransfer as DataTransfer).dropEffect = "move";
                dropNode.add(asset);
                return;
            }
                
        }

        ((event as any as DragEvent).dataTransfer as DataTransfer).dropEffect = "none";
    };
    const dragOver = (e: AntTreeNodeMouseEvent) =>
    {
        const { event, node } = e;
        event.preventDefault();
        if (node.props.dataRef instanceof AssetsFolder)
            ((event as any as DragEvent).dataTransfer as DataTransfer).dropEffect = "move";
        else
            ((event as any as DragEvent).dataTransfer as DataTransfer).dropEffect = "none";
    };
    const dragEnd = (e: AntTreeNodeMouseEvent) =>
    {
        const { event, node } = e;
        event.preventDefault();
        if ((event as any as DragEvent).dataTransfer?.dropEffect === "move")
        {
            const x = 0;
        }
            
    };
    
    return (<Menu mode="inline" defaultOpenKeys={["assets"]}>
        <Menu.SubMenu title="Assets" key="assets" className="assets">
            <div>
                <DirectoryTree selectable multiple defaultExpandAll draggable expandAction="doubleClick" onDragStart={dragStart} onDragOver={dragOver} onDrop={drop} onDragEnd={dragEnd} >
                    {editor.userAssets.children.map(child => renderAssetsTreeNode(child))}
                </DirectoryTree>
            </div>
        </Menu.SubMenu>
    </Menu>);
}

function renderAssetsTreeNode(node: IAssetNode)
{
    if (node instanceof AssetsFolder)
        return (<Tree.TreeNode title={node.name} isLeaf={false} key={node.name} dataRef={node} selectable>
            {node.children.map(child => renderAssetsTreeNode(child))}
        </Tree.TreeNode>);
    else if (node instanceof AssetNode)
        return (<Tree.TreeNode title={node.name} key={node.name} icon={assetIcon(node.asset)} selectable isLeaf dataRef={node} />);
}

function assetIcon(asset: IAsset)
{
    if (asset instanceof AssetsFolder)
        return undefined;
    else if (asset instanceof Mesh)
        return (<Icon component={IconCubeFill} />);
    else if (asset instanceof Material)
        return (<Icon component={IconTextureBox} />);
    else if (asset instanceof Shader)
        return (<Icon component={IconCode} />);
    else if (asset instanceof Texture2D)
        return (<Icon component={IconImage} />);
    else if (asset instanceof Entity)
        return (<Icon component={IconPackage} />);
}

