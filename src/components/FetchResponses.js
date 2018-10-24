class FetchResponses {

  static processResponse(response) {
    const json_response = response.json();
    if (response.status >= 200 && response.status < 300) {
      console.log(response);
      return Promise.resolve(json_response);
    } else {
      return json_response.then(Promise.reject.bind(Promise));
    }
  };

  static succesResponse(response) {
    alert(response.detail);
    console.info("Request success:", JSON.stringify(response));
  };

  static errorResponse(error) {
    if(JSON.stringify(error).length > 2) {
      console.error("Request failed:", JSON.stringify(error));
    }else{
      console.error(error);
    }
  };

}

export default FetchResponses;