import React, { useContext, useState } from "react";
import { EditorContext } from "../context/editor-context";
import { Radio, Icon, Select } from "antd";
import { IconMove, IconRotation, IconScale, IconEarth, IconAixs, IconCursor, IconCube, IconCenter, IconRotateOrbit } from "./icons";
import { RadioChangeEvent } from "antd/lib/radio";
import { EditorToolsState } from "../common/tools";

export function EditorToolBar(props: {})
{
    const [tool, setTool] = useState("none" as EditorToolsState["tool"]);
    const [space, setSpace] = useState("world" as EditorToolsState["space"]);
    const [pivot, setPivot] = useState("pivot" as EditorToolsState["pivot"]);
    const editor = useContext(EditorContext);

    const toolChange = (e:RadioChangeEvent) =>
    {
        if (!editor)
            return;
        editor.tools.current.tool = e.target.value as typeof tool;
        setTool(e.target.value as typeof tool);
    };
    const pivotChange = (e: RadioChangeEvent) =>
    {
        if (!editor)
            return;
        editor.tools.current.pivot = e.target.value as typeof pivot;
        setPivot(e.target.value as typeof pivot);
    };
    const spaceChange = (e: RadioChangeEvent) =>
    {
        if (!editor)
            return;
        editor.tools.current.space = e.target.value as typeof space;
        setSpace(e.target.value as typeof space);
    };

    if (editor)
        editor.on("toolchange", () =>
        {
            setPivot(editor.tools.current.pivot);
            setTool(editor.tools.current.tool);
            setSpace(editor.tools.current.space);
        });

    const toolIcons = {
        "none": IconCursor,
        "position": IconMove,
        "rotation": IconRotateOrbit,
        "scaling": IconScale,
    };

    if (!editor)
        return null;
    return (<ul className="tool-bar-menu">
        <li>
            <Radio.Group onChange={toolChange} value={tool} size="small">
                {Object.keys(toolIcons).map(value => (
                    <Radio.Button value={value} key={value}>
                        <Icon component={toolIcons[value as keyof typeof toolIcons]}/>
                    </Radio.Button>
                ))}
            </Radio.Group>
        </li>
        <li>
            <Radio.Group value={space} onChange={spaceChange} size="small">
                <Radio.Button value="world">
                    <Icon component={IconEarth}/>
                    World
                </Radio.Button>
                <Radio.Button value="local">
                    <Icon component={IconCube} />
                    Local
                </Radio.Button>
            </Radio.Group>
        </li>
        <li>
            <Radio.Group value={pivot} onChange={pivotChange} size="small">
                <Radio.Button value="pivot">
                    <Icon component={IconAixs}/>
                    Pivot
                </Radio.Button>
                <Radio.Button value="center">
                    <Icon component={IconCenter}/>
                    Center
                </Radio.Button>
            </Radio.Group>
        </li>
    </ul>)
}