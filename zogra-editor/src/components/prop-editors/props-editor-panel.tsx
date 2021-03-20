import React from "react";
import { Menu } from "antd";
import { Entity, Light } from "zogra-renderer";
import classNames from "classnames";

type PropsEditorRenderer = (entity: Entity) => JSX.Element;

export function PropsEditorPanel(props: {children: React.ReactNode})
{
    const keys = React.Children.map(props.children, child => (child as JSX.Element).key as string);
    return (
        <Menu mode="inline" defaultOpenKeys={keys as string[]}>
            {props.children}
        </Menu>
    )
}

export function PropsList(props: { children: React.ReactNode, className?: string })
{
    return (
        <ul className={classNames("props-list", props.className)}>
            {React.Children.map(props.children, node => (<li>{node}</li>))}
        </ul>
    );
}