import axios from "axios";
const request = async url => {
  if (!url) {
    throw new Error("Url parameter required!");
  }
  // fetch
  return axios
    .get(url)
    .then(res => {
      if (res.status > 200) {
        throw res.status;
      }
      return res.data;
    })
    .then(res => res)
    .catch(err => {
      return err;
    });
};

export default request;
