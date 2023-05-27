import * as React from "react";
import * as ReactDOMClient from "react-dom/client";
import Providers from "./Providers";

const domContainer = document.querySelector("#root");
const root = domContainer && ReactDOMClient.createRoot(domContainer);
root && root.render(<Providers></Providers>);
