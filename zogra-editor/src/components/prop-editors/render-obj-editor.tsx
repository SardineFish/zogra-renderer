import React, { useState, useContext } from "react";
import { RenderObject, Mesh, Material } from "zogra-renderer";
import { Menu } from "antd";
import { editTransform } from "./transform-editor";
import SubMenu from "antd/lib/menu/SubMenu";
import { editValue, ObjectEditor, ListEditor } from "./value-editors";
import { PropsEditorPanel, PropsList } from "./props-editor-panel";
import { editMaterial } from "./material-editor";
import { EditorContext } from "../../context/editor-context";

export function RenderObjectPropsEditor(props:{obj: RenderObject})
{
    return (
        <PropsEditorPanel>
            {editTransform(props.obj)}
            {editRenderObject(props.obj)}
            {props.obj.materials.map(material => editMaterial(material))}
        </PropsEditorPanel>
    )
}

function editRenderObject(obj: RenderObject)
{
    const editor = useContext(EditorContext);
    const createMesh = () => null as any;
    const materialChange = () =>
    {
        editor?.reloadPropertiesEditor(obj);
    };
    return (<SubMenu className="props-editor" key="render-obj" title="RenderObject">
        <PropsList className="render-obj-editor">
            <ListEditor label="Meshes" list={obj.meshes} onElementCreate={createMesh} renderer={(mesh, idx) => (
                <ObjectEditor label="" target={obj.meshes} name={idx} type={Mesh}/>
            )} />
            <ListEditor label="Materials" list={obj.materials} onElementCreate={() => null as any} renderer={(material, idx) => (
                <ObjectEditor target={obj.materials} name={idx} type={Material} onChange={materialChange}/>
            )} />
        </PropsList>
    </SubMenu>)
}