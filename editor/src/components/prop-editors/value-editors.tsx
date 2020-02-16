import React, { ChangeEvent, useState, FunctionComponent, useEffect } from "react";
import { InputNumber, Input, Dropdown, Menu, Icon, Slider, Checkbox, Switch } from "antd";
import { SelectParam } from "antd/lib/menu";
import { clamp } from "../../util/math-util";
import { quat } from "zogra-renderer";

interface ValueEditorProps
{
    target: any;
    name: string;
    label?: string;
}

export function LabeledEditor(props: { label: string, children: React.ReactNode, className: string })
{
    return (
        <div className={["value-editor", props.className].join(" ")}>
            <span className="label">{props.label}</span>
            {
                props.children
            }
        </div>
    );
}

export function editValue<Type extends FunctionComponent<any>, T>(Type: Type, target: T, name: keyof T, props: Omit<Omit<Parameters<Type>[0], "target">, "name">)
{
    return React.createElement(Type as any, {
        target: target,
        name: name,
        ...props
    });
}

export function NumberEditor(props: ValueEditorProps)
{
    const [value, setValue] = useState(props.target[props.name] as number);
    const valueChange = (value?: number) =>
    {
        if (!isNaN(value as number))
        {
            props.target[props.name] = value;
            setValue(value as number);
        }
    };
    useEffect(() =>
    {
        setValue(props.target[props.name] as number);
    }, [props.target, props.name]);
    return (
        <LabeledEditor className="number-editor" label={props.label || props.name}>
            <InputNumber size="small" value={value} onChange={valueChange} />
        </LabeledEditor>
    )
}

export function StringEditor(props: ValueEditorProps)
{
    const [value, setValue] = useState(props.target[props.name] as string);
    const valueChange = (e: ChangeEvent<HTMLInputElement>) =>
    {
        props.target[props.name] = e.target.value || props.target[props.name];
        setValue(props.target[props.name]);
    }
    useEffect(() =>
    {
        setValue(props.target[props.name] as string);
    }, [props.target, props.name]);
    return (
        <LabeledEditor className="string-editor" label={props.label || props.name}>
            <Input size="small" value={value} onChange={valueChange}/>
        </LabeledEditor>
        
    )
}

export function VectorEditor(props: ValueEditorProps)
{
    const [vec, setVec] = useState(props.target[props.name] as number[],);
    const valueChange = (i: number) => (value?: number) =>
    {
        if (!isNaN(value as number))
        {
            const vec = props.target[props.name] as number[];
            vec[i] = value as number;
            setVec([...vec]);
            props.target[props.name] = vec;
        }
    };
    useEffect(() =>
    {
        setVec(props.target[props.name] as number[]);
    }, [props.target, props.name]);
    const axis = ["x", "y", "z", "w"];
    return (
        <LabeledEditor className="vector-editor wrap" label={props.label || props.name}>
            <div className="horizon-layout">
                {
                    vec.map((num, i) => (<LabeledEditor className="number-editor vector-component-editor inline" label={axis[i]} key={i}>
                        <InputNumber size="small" value={num} onChange={valueChange(i)} />
                    </LabeledEditor>))
                }
            </div>
        </LabeledEditor>
    )
}

export function QuaternionEditor(props: ValueEditorProps)
{
    const [euler, setEular] = useState(quat.euler(props.target[props.name] as quat));
    const valueChange = (i: number) => (value?: number) =>
    {
        if (!isNaN(value as number))
        {
            euler[i] = value as number;
            setEular(euler);
            props.target[props.name] = quat.fromEuler(euler);
            
        }
    };
    useEffect(() =>
    {
        setEular(quat.euler(props.target[props.name] as quat));
    }, [props.target, props.name]);
    const axis = ["x", "y", "z", "w"];
    return (
        <LabeledEditor className="vector-editor rotation-editor wrap" label={props.label || props.name}>
            <div className="horizon-layout">
                {
                    euler.map((num, i) => (<LabeledEditor className="number-editor vector-component-editor inline" label={axis[i]} key={i}>
                        <InputNumber size="small" defaultValue={num} onChange={valueChange(i)} key={i} />
                    </LabeledEditor>))
                }
            </div>
        </LabeledEditor>
    )
}

interface EnumOptions
{
    [key: string]: any;   
}


interface EnumEditorProps extends ValueEditorProps
{
    options: EnumOptions;    
}
export function EnumEditor(props: EnumEditorProps)
{
    const toLabel = (value: any) =>
    {
        for (const key in props.options)
        {
            if (props.options[key] === value)
                return key;
        }
        return "";
    };
    const [selected, setSelected] = useState(toLabel(props.target[props.name]));
    const select = (param: SelectParam) =>
    {
        props.target[props.name] = props.options[param.key];
        setSelected(param.key);
    }
    useEffect(() =>
    {
        setSelected(toLabel(props.target[props.name]));
    }, [props.target, props.name]);
    const menu = (
        <Menu onSelect={select} selectable selectedKeys={[selected]}>
            {
                Object.keys(props.options).map(name => (
                    <Menu.Item key={name}>{name}</Menu.Item>
                ))
            }
        </Menu>
    )
    return (
        <LabeledEditor className="enum-editor" label={props.label || props.name}>
            <Dropdown.Button overlay={menu} icon={<Icon type="down"/>} size="small">
                {selected}
            </Dropdown.Button>
        </LabeledEditor>
    )
}

export function RangeEditor(props: ValueEditorProps & { min: number, max: number })
{
    const [value, setValue] = useState(props.target[props.name] as number);
    const valueChange = (value?: number) =>
    {
        if (value === undefined)
            return;
        setValue(clamp(value, props.min, props.max));
        props.target[props.name] = clamp(value, props.min, props.max);
    };
    useEffect(() =>
    {
        setValue(props.target[props.name] as number);
    }, [props.target, props.name]);
    return (<LabeledEditor className="range-editor" label={props.label || props.name}>
        <div className="horizon-layout">
            <Slider className="range-slider" min={props.min} max={props.max} value={value} onChange={v => valueChange(v as number)} />
            <InputNumber className="range-value" size={"small"} value={value} onChange={valueChange} />
        </div>
    </LabeledEditor>)
}

export function BooleanEditor(props: ValueEditorProps)
{
    const [value, setValue] = useState(props.target[props.name] as boolean);
    const valueChange = () =>
    {
        setValue(!value);
        props.target[props.name] = value;
    };
    useEffect(() =>
    {
        setValue(props.target[props.name] as boolean);
    }, [props.target, props.name]);
    return (<LabeledEditor className="bool-editor" label={props.label || props.name}>
        <Switch checked={value} onChange={valueChange} size="small"/>
    </LabeledEditor>)
}