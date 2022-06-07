import * as React from "react";
import ReactLoading from "react-loading";
import "./LoadingIndicator.css";

export function LoadingIndicator() {
    return (
        <div className="loading-indicator__root">
            <ReactLoading type="spinningBubbles" color="#fff" />
            <p className="loading-indicator__text">Loading Images...</p>
        </div>
    );
}