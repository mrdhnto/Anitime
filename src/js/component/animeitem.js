class AnimeItem extends HTMLElement {
  constructor(){
    super();
  }

  set anime(anime) {
    this._anime = anime;
    this.render();
  }
 
  render() {
    
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let airingTime;

    if (this._anime.format === "MOVIE") {
      let hours, rhours, minutes, rminutes, info_2;

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const site_mode = urlParams.get('mode')

      if(site_mode === "movies"){
        if(this._anime.studios.nodes !== null){
          let std = this._anime.studios.nodes.map((el) => {
            return el["name"]
          })
          if (std.length === 0){
            info_2 = "Unknow";
          } else {
            info_2 = std[0];
          }
        }
        if(this._anime.startDate.year === null){
          this._anime.startDate.year = "2020";
        }
      } else {
        info_2 = "Episode " + this._anime.episodes;
      }

      if (this._anime.bannerImage === null){
        this._anime.bannerImage = "/dist/assets/images/anitime-bn.png";
      }

      if (this._anime.duration > 60){
        hours = Math.floor(this._anime.duration / 60);
        minutes = this._anime.duration % 60;
        this._anime.duration = hours + " Jam " + minutes;
      } else if (this._anime.duration === null){
        this._anime.duration = "?";
      }

      airingTime = this._anime.startDate.day + this._anime.startDate.month + this._anime.startDate.year;

      if (this._anime.startDate.day === null){
        this._anime.startDate.day = "";
      }

      if (this._anime.startDate.month === null){
        this._anime.startDate.month = "";
      } else {
        this._anime.startDate.month = months[this._anime.startDate.month - 1];
      }

      if (this._anime.episodes === null){
        this._anime.episodes = "?";
      }

      if (this._anime.description === null){
        this._anime.description = "Updating...";
      }

      this._anime.genres = this._anime.genres.join(', ');
      

      this.innerHTML = `
 
        <div class="card mb-0 rounded-0 ${airingTime}">
          <div class="row no-gutters">
            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 anime-cover">
              <img src="${this._anime.coverImage.large}" class="card-img" alt="${this._anime.title.romaji}">
              <div class="card-img-overlay align-content-between row d-flex" target="${this._anime.id}">
                <h5 class="air-time">${this._anime.startDate.day} ${this._anime.startDate.month} ${this._anime.startDate.year}</h5>
                <h5 class="air-eps">${info_2}</h5>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
              <div class="card-body d-flex flex-column h-100">
                <div class="anime-title">
                  <h5 class="card-title" target="${this._anime.id}">${this._anime.title.romaji}</h5>
                </div>
                <div class="anime-desc anime-info">
                  <p class="card-text">${this._anime.description}</p>
                </div>
                <div class="anime-info mt-auto">
                  <p class="card-text"><small class="text-muted text-muted-anime font-weight-bold">${this._anime.episodes} Episode | ${this._anime.genres}</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>

      `;

    } else {

      if (this._anime.media.bannerImage === null){
        this._anime.media.bannerImage = "/dist/assets/images/anitime-bn.png";
      }

      if (this._anime.media.description === null){
        this._anime.media.description = "Updating...";
      }
      
      this._anime.media.genres = this._anime.media.genres.join(', ');

      airingTime = moment.unix(this._anime.airingAt).format('DD MMM, HH:mm');

      if (this._anime.media.episodes === null){
        this._anime.media.episodes = "?";
      }

      if (this._anime.media.duration === null){
        this._anime.media.duration = "?";
      }

      this.innerHTML = `
 
        <div class="card mb-0 rounded-0 ${this._anime.airingAt}">
          <div class="row no-gutters">
            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 anime-cover">
              <img src="${this._anime.media.coverImage.large}" class="card-img" alt="${this._anime.media.title.romaji}">
              <div class="card-img-overlay align-content-between row d-flex">
                <h5 class="air-time">${airingTime}</h5>
                <h5 class="air-eps">Episode ${this._anime.episode}</h5>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
              <div class="card-body d-flex flex-column h-100">
                <div class="anime-title">
                  <h5 class="card-title" target="${this._anime.media.id}">${this._anime.media.title.romaji}</h5>
                </div>
                <div class="anime-desc anime-info">
                  <p class="card-text">${this._anime.media.description}</p>
                </div>
                <div class="anime-info mt-auto">
                  <p class="card-text"><small class="text-muted text-muted-anime font-weight-bold">${this._anime.media.episodes} Episode | ${this._anime.media.genres}</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>

      `;

    }

  }
}
 
customElements.define("anime-item", AnimeItem);