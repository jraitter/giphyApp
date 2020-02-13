import GiphysService from "../Services/GiphysService.js";
import store from "../store.js";

//Private
function _draw() {
  let giphys = store.State.giphys;
  console.log(giphys);
}

//Public
export default class GiphysController {
  constructor() {
    console.log("GiphysController constructor loaded");

    store.subscribe("giphys", _draw);
  }
}
