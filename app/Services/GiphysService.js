import store from "../store.js";
import Giphy from "../Models/Giphy.js";


// @ts-ignore
let _sandboxApi = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/James/gifs",
  timeout: 3000
});

// @ts-ignore
let _giphyApi = axios.create({
  baseURL: "//api.giphy.com/v1/gifs",
  timeout: 3000
});


class GiphysService {
  constructor() {
    console.log("GiphysService constructor loaded");
  }
  getApiGiphys() {
    _giphyApi
      .get("trending?api_key=6UdS940c1uEgUYJC1LYkpPWRIZu5BiyK")
      .then(result => {
        let apiGiphs = result.data.data.map(g => new Giphy(g))
        store.commit("giphys", apiGiphs)
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  getGiphyByQuery(query) {
    _giphyApi
      .get("search?api_key=6UdS940c1uEgUYJC1LYkpPWRIZu5BiyK&q=" + query)
      .then(result => {
        let apiGiphs = result.data.data.map(g => new Giphy(g))
        store.commit("giphys", apiGiphs)
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  setActive(id) {
    let giphy = store.State.giphys.find(g => g.id == id);
    if (!giphy) {
      giphy = store.State.myGiphys.find(g => g.id == id);
      if (!giphy) {
        console.error("invalid giphy id");
        return;
      }
    }
    store.commit("activeGiphy", giphy);
  }
  addToMyList() {
    _sandboxApi
      .post("", store.State.activeGiphy)
      .then(result => {
        let currGiphy = new Giphy(result.data.data)
        let allMyGiphys = [...store.State.myGiphys, currGiphy];
        store.commit("myGiphys", allMyGiphys);
      })
      .catch(err => {
        throw new Error(err);
      });
  }
  getMyList() {
    _sandboxApi
      .get("")
      .then(result => {
        let myGiphys = result.data.data.map(g => new Giphy(g));
        store.commit("myGiphys", myGiphys);
      })
      .catch(err => {
        throw new Error(err);
      });
  }
  remove() {
    _sandboxApi
      .delete(store.State.activeGiphy.id)
      .then(result => {
        let myList = store.State.myGiphys.filter(g => store.State.activeGiphy.id != g.id)
        store.commit("myGiphys", myList)
        store.commit("activeGiphy", null)
      })
      .catch(err => {
        throw new Error(err);
      });
  }
}

const service = new GiphysService();
export default service;
