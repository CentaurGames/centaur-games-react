export function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export const BASE_URL = window.location.href.match("^[^?]*");

export function getBlogUrl(blogName) {
  return BASE_URL + "?pageType=blog&pageName=" + blogName;
}
