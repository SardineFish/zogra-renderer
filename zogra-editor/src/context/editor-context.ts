import React from "react";
import { ZograEditor } from "../common/zogra-editor";

export const EditorContext = React.createContext<ZograEditor | null>(null);
