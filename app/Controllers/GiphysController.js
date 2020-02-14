import GiphysService from "../Services/GiphysService.js";
import store from "../store.js";

//Private
function _drawResults() {
  let giphys = store.State.giphys;
  console.log(giphys);
  let template = "";
  giphys.forEach(s => {
    template += s.previewTemplate;
  });
  document.getElementById("search-results").innerHTML = template;
}

function _drawActive() {
  let activeGiphy = store.State.activeGiphy;
  if (!activeGiphy) {
    document.getElementById("active-giphy").innerHTML = "";
    return;
  }
  document.getElementById("active-giphy").innerHTML = activeGiphy.activeTemplate;
}

function _drawMyList() {
  let giphys = store.State.myGiphys;
  console.log("drawMyList()", giphys);
  let template = "";
  giphys.forEach(s => {
    template += s.previewTemplate;
  });
  document.getElementById("my-giphs").innerHTML = template;
}

//Public
export default class GiphysController {
  constructor() {
    console.log("GiphysController constructor loaded");
    store.subscribe("giphys", _drawResults);
    store.subscribe("activeGiphy", _drawActive);
    store.subscribe("myGiphys", _drawMyList);
    GiphysService.getApiGiphys();
    GiphysService.getMyList();

  }
  getSearchGiphys(event) {
    event.preventDefault();
    let formData = event.target;
    GiphysService.getGiphyByQuery(formData.query.value)
  }
  setActive(id) {
    GiphysService.setActive(id);
  }
  addToMyList() {
    GiphysService.addToMyList()
  }
  getMyList() {
    GiphysService.getMyList();
  }
  remove() {
    GiphysService.remove();
  }
}
