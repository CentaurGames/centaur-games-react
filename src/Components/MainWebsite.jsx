import * as React from "react";
import { getUrlParameter } from "../Util/UrlHelper";
import { ListPage } from "./ListPage";
import { LandingPage } from "./LandingPage";
import { GameComponent } from "./GameComponent";
import { PrivacyPolicyPage } from "./PrivacyPolicyPage";
import { AboutUsPage } from "./AboutUsPage";
import { BlogComponent } from "./BlogComponent";

/**
 * pageType: "list", "blog" etc
 * pageName: ListPage etc
 */
export function MainWebsite() {
  const [isLoaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  const pageType = getUrlParameter("pageType");
  const pageName = getUrlParameter("pageName");

  if (!isLoaded) {
    return <div />;
  }

  switch (pageType) {
    case "list":
      return <ListPage name={pageName} />;
    case "landing":
      return <LandingPage game={pageName} />;
    case "game":
      return <GameComponent gameName={pageName} />;
    case "privacy":
      return <PrivacyPolicyPage />;
    case "about":
      return <AboutUsPage />;
    case "blog":
      return <BlogComponent blogName={pageName} />;
    default:
      return <ListPage name={"Home"} />;
  }
}
