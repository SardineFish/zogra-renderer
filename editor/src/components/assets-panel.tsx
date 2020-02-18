import React, { useContext, useState, useEffect } from "react";
import { EditorContext } from "../context/editor-context";
import { Menu, Tree, Icon } from "antd";
import { AssetsFolder } from "../common/assets/user-assets";
import { IAsset, Mesh, Material, Shader, Texture, Entity, Texture2D } from "zogra-renderer";
import { IconCubeFill, IconPaintBucket, IconCode, IconTextureBox, IconImage, IconPackage } from "./icons";
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
    
    
    return (<Menu mode="inline" defaultOpenKeys={["assets"]}>
        <Menu.SubMenu title="Assets" key="assets" className="assets">
            <div>
                <DirectoryTree selectable multiple defaultExpandAll expandAction="doubleClick">
                    {editor.userAssets.children.map(child => renderAssetsTreeNode(child))}
                </DirectoryTree>
            </div>
        </Menu.SubMenu>
    </Menu>);
}

function renderAssetsTreeNode(asset: IAsset)
{
    if (asset instanceof AssetsFolder)
        return (<Tree.TreeNode title={asset.name} isLeaf={false} key={asset.name} icon={assetIcon(asset)} selectable>
            {asset.children.map(child => renderAssetsTreeNode(child))}
        </Tree.TreeNode>);
    else
        return (<Tree.TreeNode title={asset.name} key={asset.name} icon={assetIcon(asset)} selectable isLeaf />);
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

