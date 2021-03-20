import { serializeProject, deserializeProject } from "./project";
import { ZograEditor } from "../zogra-editor";

const SAVES_LIST = "zogra-saves";

interface SavedProject
{
    name: string;
    time: number;
}

export function getLocalSaves(): SavedProject[]
{
    try
    {
        const list = JSON.parse(localStorage.getItem(SAVES_LIST) as string);
        if (list instanceof Array)
            return list as SavedProject[];
    }
    catch { }
    return [];
}

export function saveLocalProject(editor: ZograEditor, name: string)
{
    const project = JSON.stringify(serializeProject(editor));
    localStorage.setItem(name, project);
    const list = getLocalSaves();
    list.push({
        name: name,
        time: Date.now()
    });
    localStorage.setItem(SAVES_LIST, JSON.stringify(list));
}

export async  function loadLocalProejct(editor:ZograEditor, name: string)
{
    const project = localStorage.getItem(name);
    if (typeof (project) === "string")
    {
        await deserializeProject(editor, JSON.parse(project));
    }
}