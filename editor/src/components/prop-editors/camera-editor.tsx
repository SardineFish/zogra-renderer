import React from "react";
import { Camera, Projection } from "zogra-renderer";
import { Menu } from "antd";
import { editTransform } from "./transform-editor";
import { editValue, NumberEditor, BooleanEditor, EnumEditor, RangeEditor } from "./value-editors";
import { PropsEditorPanel } from "./props-editor-panel";

export function CameraPropsEditor(prop: { camera: Camera })
{
    return (
        <PropsEditorPanel>
            {editTransform(prop.camera)}
            {editCamera(prop.camera)}
        </PropsEditorPanel>
    )
}

function editCamera(camera: Camera)
{
    return (
        <Menu.SubMenu className="props-editor" title="Camera" key="camera">
            <ul className="props-list camera-editor">
                <li>{editValue(BooleanEditor, camera, "clearDepth", { label: "Clear Depth" })}</li>
                <li>{editValue(NumberEditor, camera, "near", { label: "Near" })}</li>
                <li>{editValue(NumberEditor, camera, "far", { label: "Far" })}</li>
                <li>{editValue(EnumEditor, camera, "projection", {
                    options: {
                        "Perspective": Projection.Perspective,
                        "Orthographic": Projection.Orthographic
                    }
                })}</li>
                <li>{editValue(RangeEditor, camera, "FOV", { label: "FOV", min: 0, max: 180 })}</li>
            </ul>
        </Menu.SubMenu>
    )
}