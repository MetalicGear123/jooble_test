import request from "./request";

/**
 * @function Api
 * @description Factory function to create a object that can send
 * requests to a specific resource on the server.
 * @param {string} resource The resource used for config
 */
const apiKey = "a0ab6db11a2ad5f2669c61ef3080917f";

const Api = type => {
  return {
    /**
     * @function get
     * @description Make a GET request.
     * @param {string} endpoint
     * @param {object} options
     * @returns {promise}
     */
    get: city =>
      request(
        `https://api.openweathermap.org/data/2.5/${type}?q=${city}&appid=${apiKey}`
      )
  };
};

export default Api;
