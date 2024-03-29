import { BLOG_META_INFO } from "../Util/SiteUtil";
import * as React from "react";
import { SocialMediaIcons } from "./SocialMediaIcons";
import { PrivacyPolicyAboutUs } from "./PrivacyPolicyAboutUs";
import "./MobileGamesListPage.css";
import { MenuBar } from "./MenuBar";
import { BlogIcon } from "./BlogIcon";

export function BlogListPage() {
  const blogNameArray = React.useMemo(() => Object.keys(BLOG_META_INFO), []);

  return (
    <div>
      {/*Menu Bar*/}
      <div style={{ marginBottom: 40 }}>
        <MenuBar />
      </div>
      <div>
        {blogNameArray.map((blogName) => (
          <BlogIcon key={blogName} blogName={blogName} />
        ))}
      </div>
      {/*Social Media Icons*/}
      <div>
        <SocialMediaIcons />
      </div>
      {/*Privacy Policy About Us*/}
      <div>
        <PrivacyPolicyAboutUs />
      </div>
    </div>
  );
}
