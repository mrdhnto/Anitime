import './infoitem.js';

let movie = 0;
let ova = 0;

class AnimeInfo extends HTMLElement {

  constructor(){
    super();
  }

   set dataresult(dataresult) {
      this._dataresult = dataresult;
   }

   set animeformat(animeformat) {
      this._animeformat = animeformat;
      this.render();
   }
 
   render() {
        const listAnimeElement = document.querySelector("anime-info");
        listAnimeElement.innerHTML = `
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            .anime-bn {
              background-repeat: no-repeat;
              background-size: cover;
              max-height: 19vw;
              background-position: 50% 35%;
            }

            .anime-bn-fill {
              visibility: hidden;
              max-height: 19vw;
            }

            .anime-cv {
              padding: 1px;
              position: absolute;
              margin: 5em 2em;
            }

            .anime-cv img {
              max-height: 100%;
              min-width: 100%;
              max-height: 19.2vw;
              object-fit: cover;
              object-position: center;
            }

            .anime-info-left {
              padding: 6em 1em 0 3em;
              margin: 0;
            }

            .info-title {
              font-size: 14px;
              color: #263238;
              font-weight: 600;
              margin-top: 5px;
            }

            .info-text {
              font-size: 13px;
              font-weight: 300;
              color: #6c757d;
            }

            .anime-info-right {
              padding: 0 0 0 0.2em;
              margin: 1em 3em 1em 3em;
            }

            #ai-r-title {
              min-height: 5.3vw;
            }

            #ai-r-text {
              min-height: 12vw;
              font-size: 13px;
            }

            .jumbotron-text {
              font-size: 13px;
             color: #6c757d;
            }

            @media only screen and (min-width: 0px) and (max-width: 425px) {
              .anime-info-right {
                margin: 1em 1em 1em 1.5em;
              }
            }
          </style>
          `;

        if (this._animeformat === "MOVIE"){

          this._dataresult.Page.media.forEach(media => {
            if (media.endDate.day !== null && media.endDate.month !== null){
              const infoItemElement = document.createElement("info-item");
              infoItemElement.anime = media;
              this.appendChild(infoItemElement);
              movie = movie + 1;
            }
          })
          setTimeout(function(){
            if (movie === 0){
              listAnimeElement.innerHTML = '<div class="rounded-0 mt-3 w-100 text-center animated fadeInUp"><h4 class="no-item">No Movie Aired <span class="no-item-line"><br /></span>for next 2 Weeks</h4></div>';
            }
          }, 2000);

        } else {

          this._dataresult.Page.airingSchedules.forEach(airingSchedules => {
            if (this._animeformat === "TV") {
              if (airingSchedules.media.format === "TV" || airingSchedules.media.format === "TV_SHORT") {
                const infoItemElement = document.createElement("info-item");
                infoItemElement.anime = airingSchedules;
                this.appendChild(infoItemElement);
              }
            } else if (this._animeformat === "TV2") {
              if (airingSchedules.media.format === "TV" || airingSchedules.media.format === "TV_SHORT") {
                const infoItemElement = document.createElement("info-item");
                infoItemElement.anime = airingSchedules;
                this.appendChild(infoItemElement);
              }
            } else if (this._animeformat === "OVA") {
              if (airingSchedules.media.format === "OVA" || airingSchedules.media.format === "ONA") {
                const infoItemElement = document.createElement("info-item");
                infoItemElement.anime = airingSchedules;
                this.appendChild(infoItemElement);
                ova = ova + 1;
              }
              setTimeout(function(){
                if (ova === 0){
                  listAnimeElement.innerHTML = '<div class="rounded-0 w-100 mt-3 text-center animated fadeInUp"><h4 class="no-item">No OVA/ONA Aired Today</h4></div>';
                }
              }, 2000);
            }
                      
          })
        }
   }
}
 
customElements.define("anime-info", AnimeInfo);