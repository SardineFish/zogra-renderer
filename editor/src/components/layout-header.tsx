import React from "react";
import { Layout } from "antd";
import { EditorToolBar } from "./tool-bar";
export function LayoutHeader()
{
    return (
        <Layout.Header className="layout-header">
            <div className="logo">ZOGRA Renderer</div>
            <EditorToolBar/>
        </Layout.Header>
    )
}