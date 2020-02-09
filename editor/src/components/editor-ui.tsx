import React, { useContext } from "react";
import { ZograEngine } from "zogra-renderer";
import { EditorContext } from "../context/editor-context";
import { Layout, Menu } from "antd";
import { TopMenu } from "./menu-bar";
import { Hierarchy } from "./hierarchy";
import { SceneView } from "./scene-view";

export function EditorUI(props: { setupCallback: (engine: ZograEngine) => void })
{
    return (
        <Layout>
            <TopMenu />
            <Layout>
                <Layout.Sider theme="light">
                    <Hierarchy />
                </Layout.Sider>
                <Layout.Content>
                    <SceneView setupCallback={props.setupCallback}/>
                </Layout.Content>
                <Layout.Sider theme="light">

                </Layout.Sider>
            </Layout>
        </Layout>
    )
}