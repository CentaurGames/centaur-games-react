import * as React from "react";
import "./MenuBar.css";
import { Logo } from "./Logo";
import { LogoTitle } from "./LogoTitle";
import MenuDrawer from "./MenuDrawer";
import { SearchBar } from "./SearchBar";
import { BASE_URL } from "../Util/UrlHelper";

export function MenuBar() {
  return (
    <div
      style={{
        backgroundColor: "#232323",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
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
        <a href={BASE_URL + "?pageType=list&pageName=Home"}>
          <Logo />
          <LogoTitle />
        </a>
      </div>
      <SearchBar />
    </div>
  );
}
