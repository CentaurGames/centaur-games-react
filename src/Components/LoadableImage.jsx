import React from "react";
import {
  startGlobalLoadingIndicator,
  stopGlobalLoadingIndicator,
} from "./GlobalLoadingIndicator";

export function LoadableImage(props) {
  React.useEffect(() => {
    startGlobalLoadingIndicator();
  }, []);

  return (
    <img
      className={props.className}
      src={props.src}
      onLoad={stopGlobalLoadingIndicator}
    />
  );
}
