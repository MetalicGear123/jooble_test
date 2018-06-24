import axios from "axios";
const request = async url => {
  console.log(url);
  if (!url) {
    throw new Error("Url parameter required!");
  }
  console.log(url);
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
    .catch(err => err);
};

export default request;
