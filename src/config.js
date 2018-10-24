import Auth from './models/Auth';


function jsonConcat(o1, o2) {
  for (var key in o2) {
    o1[key] = o2[key];
  }
  return o1;
}

const base = {
  "headers_base": {
    "Content-Type": "application/json"
  },
  "headers_auth": {
    "Content-Type": "application/json",
    "Authorization": "Token " + Auth.getSessionToken(),
  },
};

const local = {
  "create_user_token": "154fc281f09416f425f703dbc7d73d0f5331356d",
  "host": "http://127.0.0.1:8000/",
};

// Change the second json to define the environment settings
const config = jsonConcat(base, local);

const combine = {
  "headers_add_user": {
    "Content-Type": "application/json",
    "Authorization": "Token " + config.create_user_token,
  },
  "url_login": config.host + "v1/login/",
  "url_logout": config.host + "v1/logout/",
  "add_user": config.host + "user/",
  "change_pass": config.host + "v1/password/change/",
  "reset_pass": config.host + "v1/password/reset/",
};

export default jsonConcat(config, combine);
