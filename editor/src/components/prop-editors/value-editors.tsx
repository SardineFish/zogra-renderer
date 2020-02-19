import React, { ChangeEvent, useState, FunctionComponent, useEffect, DragEvent, HTMLProps, useContext } from "react";
import { InputNumber, Input, Dropdown, Menu, Icon, Slider, Checkbox, Switch, Select } from "antd";
import { SelectParam } from "antd/lib/menu";
import { clamp } from "../../util/math-util";
import { quat, IAsset, AssetManager, vec3 } from "zogra-renderer";
import { assetIcon } from "../assets-panel"
import classNames from "classnames";
import { OptionProps, LabeledValue } from "antd/lib/select";
import { EditorContext } from "../../context/editor-context";

interface ValueEditorProps
{
    target: any;
    name: string | number;
    label?: string;
}

interface LabeledEditorProps extends HTMLProps<HTMLDivElement>
{
    label?: string;
}

export function LabeledEditor(props: LabeledEditorProps)
{
    const { className, ...others } = props;
    return (
        <div className={["value-editor", props.className].join(" ")} {...others}>
            {
                props.label
                    ? <span className="label">{props.label}</span>
                    : null
            }
            {
                props.children
            }
        </div>
    );
}

export function editValue<Type extends FunctionComponent<any>, T>(Type: Type, target: T, name: keyof T, props?: Omit<Omit<Parameters<Type>[0], "target">, "name">)
{
    if (!props)
        props = {} as any;
    (props as any).label = props?.label || name;
    return React.createElement(Type as any, {
        target: target,
        name: name,
        ...props
    });
}

function usePropsValue<TProp, TState=TProp>(target: any, name: string | number, wrapper: (value: TProp) => TState = t => t as any as TState): [TState, (value: TProp)=>void]
{
    const [value, setValue] = useState(wrapper(target[name] as TProp));

    const editor = useContext(EditorContext);
    useEffect(() =>
    {
        if (!editor)
            return;
        const reloadValue = (obj: any, key: string | number) =>
        {
            if (obj === target && key === name)
                setValue(wrapper(target[name] as TProp));
        }
        editor.on("props-reload", reloadValue);
        return () => editor.off("props-reload", reloadValue);
    }, [target, name]);
    const setPropValue = (value: TProp) =>
    {
        setValue(wrapper(value));
        target[name] = value;
    };
    return [value, setPropValue];
}

export function NumberEditor(props: ValueEditorProps)
{
    const [value, setValue] = usePropsValue<number>(props.target, props.name);

    const valueChange = (value?: number) =>
    {
        if (!isNaN(value as number))
        {
            setValue(value as number);
        }
    };

    return (
        <LabeledEditor className="number-editor" label={props.label}>
            <InputNumber size="small" value={value} onChange={valueChange} />
        </LabeledEditor>
    )
}

export function StringEditor(props: ValueEditorProps)
{
    const [value, setValue] = usePropsValue<string>(props.target, props.name)

    const valueChange = (e: ChangeEvent<HTMLInputElement>) =>
    {
        
        setValue(e.target.value);
    }

    return (
        <LabeledEditor className="string-editor" label={props.label}>
            <Input size="small" value={value} onChange={valueChange} />
        </LabeledEditor>

    )
}

export function VectorEditor(props: ValueEditorProps)
{
    const [vec, setVec] = usePropsValue<number[]>(props.target, props.name, (value) => [...value]);

    const valueChange = (i: number) => (value?: number) =>
    {
        if (!isNaN(value as number))
        {
            const vec = props.target[props.name] as number[];
            vec[i] = value as number;
            setVec(vec);
        }
    };
    
    const axis = ["x", "y", "z", "w"];
    return (
        <LabeledEditor className="vector-editor wrap" label={props.label}>
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
    const [euler, setQuat] = usePropsValue<quat, vec3>(props.target, props.name, q => quat.euler(q));
    
    const valueChange = (i: number) => (value?: number) =>
    {
        if (!isNaN(value as number))
        {
            euler[i] = value as number;
            setQuat(quat.fromEuler(euler as vec3));

        }
    };

    const axis = ["x", "y", "z", "w"];
    return (
        <LabeledEditor className="vector-editor rotation-editor wrap" label={props.label}>
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
    const [selected, setValue] = usePropsValue<any, string>(props.target, props.name, toLabel);
    const select = (param: SelectParam) =>
    {
        setValue(props.options[param.key]);
    }
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
        <LabeledEditor className="enum-editor" label={props.label}>
            <Dropdown.Button overlay={menu} icon={<Icon type="down" />} size="small">
                {selected}
            </Dropdown.Button>
        </LabeledEditor>
    )
}

export function RangeEditor(props: ValueEditorProps & { min: number, max: number })
{
    const [value, setValue] = usePropsValue<number>(props.target, props.name);
    const valueChange = (value?: number) =>
    {
        if (value === undefined)
            return;
        setValue(clamp(value, props.min, props.max));
    };
    return (<LabeledEditor className="range-editor" label={props.label}>
        <div className="horizon-layout">
            <Slider className="range-slider" min={props.min} max={props.max} value={value} onChange={v => valueChange(v as number)} />
            <InputNumber className="range-value" size={"small"} value={value} onChange={valueChange} />
        </div>
    </LabeledEditor>)
}

export function BooleanEditor(props: ValueEditorProps)
{
    const [value, setValue] = usePropsValue<boolean>(props.target, props.name);
    const valueChange = () =>
    {
        setValue(!value);
    };
    return (<LabeledEditor className="bool-editor" label={props.label}>
        <Switch checked={value} onChange={valueChange} size="small" />
    </LabeledEditor>)
}

export function ObjectEditor(props: ValueEditorProps & { type: Function })
{
    const itemRenderer = (asset: IAsset) => (
        asset == null ? null :
            <span className="object-item">
                {assetIcon(asset)}
                <span className="object-name">
                    {asset.name}
                </span>
            </span>
    );

    const [value, setValue] = useState({
        key: (props.target[props.name] as IAsset)?.assetID.toString() ?? "",
        label: itemRenderer(props.target[props.name] as IAsset)
    } as LabeledValue);
    const [data, setData] = useState(AssetManager.findAssetsOfType(props.type));

    const [, rerender] = useState({});
    const editor = useContext(EditorContext);
    useEffect(() =>
    {
        if (!editor)
            return;
        const reload = () =>
        {
            rerender({});
        }
        editor.on("props-reload", reload);
        return () => editor.off("props-reload", reload);
    }, [props.target, props.name]);

    const valueChange = (labeledValue: LabeledValue) =>
    {
        const value = labeledValue.key;
        const asset = AssetManager.find(parseInt(value));
        if (asset instanceof props.type)
        {
            setValue(labeledValue);
            props.target[props.name] = asset;
        }
    };
    const onDrop = (e: DragEvent<HTMLDivElement>) =>
    {
        const id = e.dataTransfer.getData("application/zogra-asset");
        if (id)
        {
            valueChange({ key: id, label: itemRenderer(AssetManager.find(parseInt(id)) as IAsset) });
        }
    };
    const onDragOver = (e: DragEvent<HTMLDivElement>) =>
    {
        const id = e.dataTransfer.getData("application/zogra-asset");
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
        return;
        if (id)
        {
            const asset = AssetManager.find(parseInt(id));
            if (asset instanceof props.type)
            {
                e.dataTransfer.dropEffect = "move";
                return;
            }
        }
        e.dataTransfer.dropEffect = "none";
    };
    useEffect(() =>
    {
        setData(AssetManager.findAssetsOfType(props.type));
    }, [props.target, props.name]);
    const filterOption = (input: string, option: React.ReactElement<OptionProps>) =>
    {
        return AssetManager.find(parseInt(option.props.value as string))?.name.includes(input) ?? false;
    };
    return (<LabeledEditor className="object-editor" label={props.label} onDrop={onDrop} onDragOver={onDragOver}>
        <Select
            className="object-selector"
            value={value}
            size="small"
            labelInValue
            onChange={valueChange}
            showSearch
            optionFilterProp="children"
            filterOption={filterOption}
            
            >
            {data.map(asset => (<Select.Option key={asset.assetID} value={asset.assetID}>
                {itemRenderer(asset)}
            </Select.Option>))}
        </Select>
    </LabeledEditor>)
}
interface ListEditorProps<T>
{
    label: string;
    list: T[];
    renderer: (item: T, idx: number) => React.ReactNode;
    onElementCreate: (idx: number) => T;
    className?: string;
}
export function ListEditor<T>(props: ListEditorProps<T>)
{
    const [list, setList] = useState(props.list);
    const [, rerender] = useState({});
    useEffect(() =>
    {
        setList(props.list);
    }, [props.list]);
    const listAdd = () =>
    {
        const element = props.onElementCreate(list.length);
        list.push(element);
        setList(list);

        rerender({});
    };
    const removeAt = (idx:number) =>
    {
        list.splice(idx, 1);
        rerender({});
    };
    return (
        <div className={classNames("list-editor", props.className)}>
            <div className="title">
                <span className="label">{props.label}</span>
                <span className="actions">
                    <Icon type="plus" onClick={listAdd} />
                </span>
            </div>
            <ul className="list-content">
                {list.map((item, idx) => (<li className="list-element" key={idx}>
                    <div className="actions">
                        <Icon type="minus" onClick={()=>removeAt(idx)} />
                    </div>
                    <div className="list-element-content">
                        {props.renderer(item, idx)}
                    </div>
                </li>))}
            </ul>

        </div>
    )
}