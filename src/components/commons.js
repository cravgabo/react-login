import config from "../config";
import Auth from "../models/Auth";
import FetchResponses from "./FetchResponses";

class Commons {

  static logOut(){
    Auth.authenticationRequired();
    fetch(config.url_logout, {
      method: "POST",
      headers: config.headers_auth})
      .then(FetchResponses.processResponse)
      .then(Auth.logoutUser)
      .catch(FetchResponses.errorResponse);
  }

  static formDataToObject(form_data) {
    let object = {};
    form_data.forEach(function(value, key){
      object[key] = value;
    });
    return object;
  }

}

export default Commons;