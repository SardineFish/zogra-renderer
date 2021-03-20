import React from "react";
import ReactDOM from "react-dom";
import { EditorComponent } from "./editor";

window.addEventListener("load", () =>
{
    const container = document.querySelector("#root"); 
    ReactDOM.render((<EditorComponent />), container);
});