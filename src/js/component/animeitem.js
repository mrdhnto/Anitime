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

    if (this._anime.format === "MOVIE") {
      let hours, rhours, minutes, rminutes;

      if (this._anime.bannerImage === null){
        this._anime.bannerImage = "/dist/assets/images/anitime-bn.png";
      }

      if (this._anime.duration > 60){
        hours = (this._anime.duration / 60);
        rhours = Math.floor(hours);
        minutes = (hours - rhours) * 60;
        rminutes = Math.round(minutes);
        this._anime.duration = rhours + " Jam " + rminutes;
      } else if (this._anime.duration === null){
        this._anime.duration = "?";
      }

      if (this._anime.startDate.day === null){
        this._anime.startDate.day = "";
      }

      if (this._anime.episodes === null){
        this._anime.episodes = "?";
      }

      if (this._anime.description === null){
        this._anime.description = "Updating...";
      }

      if (this._anime.startDate.month === null){
        this._anime.startDate.month = "";
      } else {
        this._anime.startDate.month = months[this._anime.startDate.month - 1];
      }

      this._anime.genres = this._anime.genres.join(', ');
      

      this.innerHTML = `
 
        <div class="card mb-0 rounded-0">
          <div class="row no-gutters">
            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 anime-cover">
              <img src="${this._anime.coverImage.large}" class="card-img" alt="${this._anime.title.romaji}">
              <div class="card-img-overlay align-content-between row d-flex">
                <h5 class="air-time">${this._anime.startDate.day} ${this._anime.startDate.month} ${this._anime.startDate.year}</h5>
                <h5 class="air-eps">Episode ${this._anime.episodes}</h5>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
              <div class="card-body h-100">
                <table class="h-100">
                  <tbody>
                    <tr class="anime-title">
                      <td class="align-top"><h5 class="card-title" target="${this._anime.id}">${this._anime.title.romaji}</h5></td>
                    </tr>
                    <tr class="anime-desc anime-info">
                      <td class="align-baseline"><p class="card-text">${this._anime.description}</p></td>
                    </tr>
                    <tr class="anime-info">
                      <td class="align-bottom"><p class="card-text"><small class="text-muted text-muted-anime font-weight-bold">${this._anime.episodes} Episode | ${this._anime.genres}</small></p></td>
                    </tr>
                  </tbody>
                </table>
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

      this._anime.airingAt = moment.unix(this._anime.airingAt).format('DD MMM, HH:mm');

      if (this._anime.media.episodes === null){
        this._anime.media.episodes = "?";
      }

      this.innerHTML = `
 
        <div class="card mb-0 rounded-0">
          <div class="row no-gutters">
            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 anime-cover">
              <img src="${this._anime.media.coverImage.large}" class="card-img" alt="${this._anime.media.title.romaji}">
              <div class="card-img-overlay align-content-between row d-flex">
                <h5 class="air-time">${this._anime.airingAt}</h5>
                <h5 class="air-eps">Episode ${this._anime.episode}</h5>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
              <div class="card-body h-100">
                <table class="h-100">
                  <tbody>
                    <tr class="anime-title">
                      <td class="align-top"><h5 class="card-title" target="${this._anime.media.id}">${this._anime.media.title.romaji}</h5></td>
                    </tr>
                    <tr class="anime-desc anime-info">
                      <td class="align-baseline"><p class="card-text">${this._anime.media.description}</p></td>
                    </tr>
                    <tr class="anime-info">
                      <td class="align-bottom"><p class="card-text"><small class="text-muted text-muted-anime font-weight-bold">${this._anime.media.episodes} Episode | ${this._anime.media.genres}</small></p></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      `;

    }

  }
}
 
customElements.define("anime-item", AnimeItem);