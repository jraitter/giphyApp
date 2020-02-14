export default class Giphy {
    constructor(data) {
        this.sandbox = data.slug ? false : true;
        this.title = data.title;
        this.id = ""
        this.url = "";
        if (data.images) {
            this.url = data.images.original.url;
            this.urlSmall = data.images.downsized_still.url;
            this.id = data.id;
        } else {
            this.url = data.url;
            this.urlSmall = data.url;
            this.id = data._id;
        }
    }

    get Template() {
        return this.title
    }
    get previewTemplate() {
        return /* html*/ `
    <div class="col-12">
    <div class="card" onclick="app.giphysController.setActive('${this.id}')">
      <img src="${this.urlSmall}" class="card-img-top" alt="...">
       <div class="card-body">
         <h5 class="card-title">${this.title}</h5>
        </div>
    </div>
    </div>
    `;
    }
    get Button() {
        if (this.sandbox) {
            return ` <button class="btn btn-danger" onclick="app.giphysController.remove()">Remove</button>`;
        }
        return ` <button class="btn btn-success" onclick="app.giphysController.addToMyList()">Add</button>`;
    }

    get activeTemplate() {
        return `
      <div class="card">
            <img src="${this.url}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${this.title}</h5>
                ${this.Button}
            </div>
          </div>
      `;
    }
}