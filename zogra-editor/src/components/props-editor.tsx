import React, { useContext, useState, useEffect } from "react";
import { Menu } from "antd";
import { EditorContext } from "../context/editor-context";
import { Entity, Camera, RenderObject } from "zogra-renderer";
import { CameraPropsEditor } from "./prop-editors/camera-editor";
import { RenderObjectPropsEditor } from "./prop-editors/render-obj-editor";
import { EntityPropsEditor } from "./prop-editors/entity-editor";
import { useRerender } from "./util-hooks";

export function PropertyEditor()
{
    const editor = useContext(EditorContext);
    const [entity, setEntity] = useState(null as Entity | null);
    const rerender = useRerender();
    useEffect(() =>
    {
        if (!editor)
            return;
        
        editor.on("selectchange", (selections) =>
        {
            setEntity(selections[0]);
        });
    }, [editor]);

    useEffect(() =>
    {
        if (!editor)
            return;
        
        const propsReload = (target: any, name: string | number | null) =>
        {
            if (target === entity && !name)
                rerender();
        }
        
        editor.on("props-reload", propsReload);

        return () => editor.off("props-reload", propsReload);
    }, [entity]);

    if (!editor)
        return null;
    return (
        <Menu mode="inline" defaultOpenKeys={["properties"]}>
            <Menu.SubMenu className="editor-panel" title="Properties" key={"properties"}>
                {
                    entity == null
                        ? null
                        : entity instanceof Camera
                            ? <CameraPropsEditor camera={entity} />
                            : entity instanceof RenderObject
                                ? <RenderObjectPropsEditor obj={entity} />
                                : <EntityPropsEditor entity={entity}/>
                }
            </Menu.SubMenu>
        </Menu>
    );
}