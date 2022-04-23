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

function setCookiesUserType(userType) {
  let domain = setDomain();
  cookies.set("userType", userType, null, null, domain);
}

function getCookiesUserType() {
  if (cookies.isKey("userType")) {
    return cookies.get("userType");
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

function setCookiesUserId(userId) {
  let domain = setDomain();
  cookies.set("userId", userId, null, null, domain);
}

function getCookiesUserId() {
  if (cookies.isKey("userId")) {
    return parseInt(cookies.get("userId"));
  } else {
    return false;
  }
}

export default {
  SetCookiesToken(token) {
    return setCookiesToken(token);
  },
  SetCookiesUserId(userId) {
    return setCookiesUserId(userId);
  },
  GetCookiesUserId() {
    return getCookiesUserId();
  },
  GetCookiesToken() {
    return getCookiesToken();
  },
  DeleteCookies() {
    return deleteCookies();
  },
  SetCookiesUserType(userType) {
    return setCookiesUserType(userType);
  },
  GetCookiesUserType() {
    return getCookiesUserType();
  },
};
