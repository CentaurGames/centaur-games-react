import { getBlogUrl } from "../Util/UrlHelper";
import { BLOG_META_INFO, GAME_META_INFO } from "../Util/SiteUtil";
import * as React from "react";
import "./BlogIcon.css";

/**
 * props:
 *    blogName: string
 */
export function BlogIcon(props) {
  return (
    <a
      href={getBlogUrl(props.blogName)}
      target="_blank"
      className="blog-icon__link"
    >
      <img
        src={
          GAME_META_INFO[BLOG_META_INFO[props.blogName].featureGraphic]
            .appImageURL
        }
        className="blog-icon__image"
      />
      <div className="blog-icon__text">
        <div className="blog-icon__title">
          {BLOG_META_INFO[props.blogName].title}
        </div>
        <div
          className="blog-icon__description"
          dangerouslySetInnerHTML={{
            __html: BLOG_META_INFO[props.blogName].description,
          }}
        />
      </div>
    </a>
  );
}
