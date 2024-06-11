import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default function Prompt(props: { command: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) {
    return (
        <div className="prompt-container">
            <div className="prompt">{props.command}</div>
        </div>
    )
}