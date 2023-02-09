import * as React from "react";
import { LoadingIndicator } from "./LoadingIndicator";

export let startGlobalLoadingIndicator = () => {};

export let stopGlobalLoadingIndicator = () => {};

export function GlobalLoadingIndicator(props) {
  const [isLoading, setLoading] = React.useState(true);
  const [isFirstLoad, setFirstLoad] = React.useState(true);

  React.useEffect(() => {
    startGlobalLoadingIndicator = () => setLoading(() => true);
    stopGlobalLoadingIndicator = () =>
      setTimeout(() => setLoading(() => false), 500);
    setFirstLoad(false);
  }, []);

  return (
    <>
      <div style={{ visibility: isLoading ? "hidden" : "visible" }}>
        {!isFirstLoad && props.children}
      </div>
      {isLoading && <LoadingIndicator />}
    </>
  );
}
