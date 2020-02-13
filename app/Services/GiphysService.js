import store from "../store.js";


// @ts-ignore
let _sandboxApi = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/James/songs",
  timeout: 3000
});


class GiphysService {
  constructor() {
    console.log("GiphysService constructor loaded");

  }
}

const service = new GiphysService();
export default service;
