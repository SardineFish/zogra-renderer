import React from "react";
import { RenderObject } from "zogra-renderer";
import { Menu } from "antd";
import { editTransform } from "./transform-editor";
import SubMenu from "antd/lib/menu/SubMenu";
import { editValue } from "./value-editors";
import { PropsEditorPanel, PropsList } from "./props-editor-panel";

export function RenderObjectPropsEditor(props:{obj: RenderObject})
{
    return (
        <PropsEditorPanel>
            {editTransform(props.obj)}
            {editRenderObject(props.obj)}
        </PropsEditorPanel>
    )
}

function editRenderObject(obj: RenderObject)
{
    return (<SubMenu className="render-obj-editor props-editor" key="render-obj" title="RenderObject">
        <PropsList className="">

        </PropsList>
    </SubMenu>)
}