import React from "react";
import { Transform } from "zogra-renderer";
import { Menu } from "antd";
import { VectorEditor, QuaternionEditor, editValue } from "./value-editors";

export function editTransform(transform: Transform)
{
    transform.localRotation
    return (<Menu.SubMenu className="props-editor" title="Transform" key="transform">
        <ul className="props-list transform-editor">
            <li><VectorEditor target={transform} name="localPosition" label="Position" /></li>
            <li><QuaternionEditor target={transform} name="localRotation" label="Rotation"></QuaternionEditor></li>
            <li>{editValue(VectorEditor, transform, "localScaling",{ label:"Scaling"})}</li>
        </ul>
    </Menu.SubMenu>);
}