import React from "react";
import { RenderObject, Material } from "zogra-renderer";
import { Menu } from "antd";
import { editTransform } from "./transform-editor";
import SubMenu from "antd/lib/menu/SubMenu";
import { editValue } from "./value-editors";

export function editMaterial(mat: Material)
{
    return (<Menu.SubMenu title={`Material ${mat.name}`} key="material">
        <ul className="props-editor material-editor">
            <li></li>
        </ul>
    </Menu.SubMenu>)
}