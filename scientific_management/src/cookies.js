import cookies from "vue-cookies";
function setDomain() {
  return document.domain;
}

function setCookiesToken(token) {
  let domain = setDomain();
  cookies.set("userToken", token, null, null, domain);
}

function getCookiesToken() {
  if (cookies.isKey("userToken")) {
    return cookies.get("userToken");
  } else {
    return false;
  }
}

function deleteCookies() {
  let domain = setDomain();
  let cookies_keys = cookies.keys();
  for (let i in cookies_keys) {
    cookies.set(cookies_keys[i], "", null, null, domain);
  }
}

export default {
  SetCookiesToken(token) {
    return setCookiesToken(token);
  },
  GetCookiesToken() {
    return getCookiesToken();
  },
  DeleteCookies() {
    return deleteCookies();
  },
};
