class Auth {
  static name_token = "session_token";
  static last_user = "last_user";

  static getSessionToken() {
    return localStorage.getItem(Auth.name_token);
  }

  static isAuthenticated() {
    return Auth.getSessionToken();
  }

  static logoutUser() {
    localStorage.removeItem(Auth.name_token);
    return window.location.replace("/");
  }

  static loginUser(session_token) {
    return localStorage.setItem(Auth.name_token, session_token);
  }

  static authenticationRequired() {
    if (!Auth.isAuthenticated()) {
      window.location.replace("/");
    }
  }

  static notAuthenticationRequired() {
    if (Auth.isAuthenticated()) {
      window.location.replace("/user/");
    }
  }

  static setLastUserData(data) {
    const user = {
      username: data.username,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name
    };
    return localStorage.setItem(Auth.last_user, JSON.stringify(user));
  }

  static getLastUserData() {
    return localStorage.getItem(Auth.last_user);
  }

  static cleanAllData(){
    return localStorage.clear();
  }

}
export default Auth;
