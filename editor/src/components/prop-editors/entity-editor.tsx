import React from "react";
import { Entity } from "zogra-renderer";
import { } from "antd";
import { PropsEditorPanel } from "./props-editor-panel";
import { editTransform } from "./transform-editor";

export function EntityPropsEditor(props: { entity: Entity })
{
    return (
        <PropsEditorPanel>
            {editTransform(props.entity)}
        </PropsEditorPanel>
    )
}