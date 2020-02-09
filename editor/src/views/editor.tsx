import React, { useState, useEffect } from "react";
import {  EditorContext } from "../context/editor-context";
import { EditorUI } from "../components/editor-ui";
import { SceneView } from "../components/scene-view";
import { ZograEngine } from "zogra-renderer";
import "antd/dist/antd.css";
import "../css/editor.css";
import { ZograEditor } from "../common/zogra-editor";


export function EditorComponent()
{
    const [editor, setEditor] = useState(null as ZograEditor | null);

    const setupEditor = (engine: ZograEngine) =>
    {
        setEditor(new ZograEditor(engine));  
    };

    useEffect(() =>
    {
        if (!editor)
            return;
        editor.init();
    }, [editor]);

    return (
        <EditorContext.Provider value={editor}>
            <div className="zogra-editor">
                <EditorUI setupCallback={setupEditor}></EditorUI>
            </div>
        </EditorContext.Provider>
    );
}