import * as React from "react";
import "./MenuBar.css";
import { Logo } from "./Logo";
import { LogoTitle } from "./LogoTitle";
import MenuDrawer from "./MenuDrawer";

export function MenuBar() {
  return (
    <div style={{ backgroundColor: "#232323", width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: 400,
          justifyContent: "space-between",
          marginLeft: 40,
          marginRight: 40,
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <MenuDrawer />
        <Logo />
        <LogoTitle />
      </div>
    </div>
  );
}
