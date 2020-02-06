import React from "react";
import ReactDOM from "react-dom";
import { ZograEditor } from "./editor";

window.addEventListener("load", () =>
{
    const container = document.querySelector("#root"); 
    ReactDOM.render((<ZograEditor />), container);
});