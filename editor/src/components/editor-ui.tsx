import React, { useContext } from "react";
import { ZograEngine } from "zogra-renderer";
import { EditorContext } from "../context/editor-context";
import { Layout, Menu } from "antd";
import { LayoutHeader } from "./layout-header";
import { Hierarchy } from "./hierarchy";
import { SceneView } from "./scene-view";
import { PropertyEditor } from "./props-editor";

export function EditorUI(props: { setupCallback: (engine: ZograEngine) => void })
{
    return (
        <Layout>
            <LayoutHeader />
            <Layout>
                <Layout.Sider theme="light">
                    <Hierarchy />
                </Layout.Sider>
                <Layout.Content>
                    <SceneView setupCallback={props.setupCallback}/>
                </Layout.Content>
                <Layout.Sider theme="light" width="300">
                    <PropertyEditor/>
                </Layout.Sider>
            </Layout>
        </Layout>
    )
}