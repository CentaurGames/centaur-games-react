import { getBlogUrl } from "../Util/UrlHelper";
import * as React from "react";
import { MenuBar } from "./MenuBar";
import { BLOG_META_INFO } from "../Util/SiteUtil";
import { SocialMediaIcons } from "./SocialMediaIcons";
import { PrivacyPolicyAboutUs } from "./PrivacyPolicyAboutUs";
import { IconLandingPage } from "./IconLandingPage";
import { BlogContent } from "./BlogContent";

/**
 * props:
 *      blogName: string representing the keys of the BLOG_META_INFO dictionary
 *
 */
export function BlogComponent(props) {
  const { previousBlogName, nextBlogName } = React.useMemo(() => {
    const blogNameArray = Object.keys(BLOG_META_INFO);
    const index = blogNameArray.indexOf(props.blogName);
    const next =
      index === blogNameArray.length - 1 ? null : blogNameArray[index + 1];
    const previous = index === 0 ? null : blogNameArray[index - 1];
    return { previousBlogName: previous, nextBlogName: next };
  }, [props.blogName]);

  return (
    <div>
      <MenuBar />
      <div className="blog-title">{BLOG_META_INFO[props.blogName].title}</div>
      <BlogContent blogName={props.blogName} />
      {BLOG_META_INFO[props.blogName].gamesMentioned.length > 0 && (
        <div>
          <div className="recommended-games-text">
            Games Mentioned in This Post:
          </div>
          <div className="recommended-games">
            {BLOG_META_INFO[props.blogName].gamesMentioned.map((gameName) => (
              <IconLandingPage key={gameName} game={gameName} />
            ))}
          </div>
        </div>
      )}
      <div className="sub-paragraph">
        {nextBlogName && (
          <a className="next-blog" href={getBlogUrl(nextBlogName)}>
            {"Next Blog >>"}
          </a>
        )}
        {previousBlogName && (
          <a className="previous-blog" href={getBlogUrl(previousBlogName)}>
            {"<< Previous Blog"}
          </a>
        )}
      </div>
      <SocialMediaIcons />
      <PrivacyPolicyAboutUs />
    </div>
  );
}
