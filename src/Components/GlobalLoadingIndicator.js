import * as React from "react";
import { LoadingIndicator } from "./LoadingIndicator";

export let startGlobalLoadingIndicator = () => {};

export let stopGlobalLoadingIndicator = () => {};

export function GlobalLoadingIndicator(props) {
    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() => {
        startGlobalLoadingIndicator = () => setLoading(() => true);
        stopGlobalLoadingIndicator = () => setLoading(() => false);
    }, []);

    return (
        <>
            <div style={{visibility: isLoading ? "hidden" : "visible"}}>
                {props.children}
            </div>
            {isLoading && <LoadingIndicator />}
        </>
    );
}