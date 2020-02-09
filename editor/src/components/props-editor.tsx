import React, { useContext } from "react";
import { Menu } from "antd";
import { EditorContext } from "../context/editor-context";

export function PropertyEditor()
{
    const context = useContext(EditorContext);
    if (!context)
        return null;
    return (
        <Menu.SubMenu title="Properties">
            
        </Menu.SubMenu>
    )
}