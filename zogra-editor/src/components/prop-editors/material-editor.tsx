import React from "react";
import { RenderObject, Material, Shader, Texture2D } from "zogra-renderer";
import { Menu } from "antd";
import { editTransform } from "./transform-editor";
import SubMenu from "antd/lib/menu/SubMenu";
import { editValue, ObjectEditor, VectorEditor, NumberEditor } from "./value-editors";
import { PropsList } from "./props-editor-panel";

export function editMaterial(material: Material)
{
    return (<Menu.SubMenu title={`Material ${material.name}`} className="props-editor" key="material">
        <PropsList className="material-editor">
            <ObjectEditor label="Shader" target={material} name="shader" type={Shader} />
            {Object.keys(material.propertyBlock).map((key) =>
            {
                const prop = material.propertyBlock[key];
                switch (prop.type)
                {
                    case "vec4":
                    case "vec3":
                    case "vec2":
                        return editValue(VectorEditor, material, key, {key: key} as any);
                    case "int":
                    case "float":
                        return editValue(NumberEditor, material, key, {key: key} as any);
                    case "tex2d":
                        return <ObjectEditor label={key} target={material} name={key} type={Texture2D} key={key}/>
                }
                return null;
            })}
        </PropsList>
    </Menu.SubMenu>)
}