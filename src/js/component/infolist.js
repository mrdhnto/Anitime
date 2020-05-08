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

            .cv-container {
              min-height: 7vw;
            }

            .anime-cv {
              padding: 1px;
              margin-left: -4em;
            }

            .anime-cv img {
              max-height: 100%;
              min-width: 100%;
              max-height: 19.2vw;
              object-fit: cover;
              object-position: center;
            }

            .anime-info-left {
              position: absolute;
              margin: calc(100% - 102vw) 0em;
            }

            .anime-info-left-fill {
              visibility: hidden;
              margin: 0 0 1em 0;
            }

            .info-group {
              padding: 0.5em 6em 0 2em;
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
              margin: 1em 2.5em 1em -5em;
            }

            #ai-r-title {
              min-height: 40px;
            }

            #ai-r-text {
              min-height: 7.5em;
              font-size: 13px;
            }

            .jumbotron-text {
              font-size: 13px;
             color: #6c757d;
            }

            .ai-r-genre {
              margin-top: 2em;
            }

            .btn-back-anime {
              margin: 0 3em 3em 0;
            }

            @media only screen and (min-width: 1130px) {
              .cv-container {
                min-height: 80px;
              }
            }

            @media only screen and (min-width: 769px) and (max-width: 1024px) {
              .info-group {
                padding: 0 4rem 0 0.5rem;
              }

              .anime-info-right {
                margin-left: -4em;
              }
            }

            @media only screen and (min-width: 0px) and (max-width: 768px) {
              .anime-info-left{
                margin: 0 0 1em 0;
                max-width: 120px;
                position: relative;
              }

              .anime-cv {
                max-width: 120px;
                width: 31vw;
                box-shadow: 0 0 0 0;
                margin: 0;
              }

              .anime-cv img {
                max-height: 135px;
              }

              .info-group {
                padding: 0 0 0 0.5em;
              }

              .anime-info-left-fill {
                max-width: 120px;
                display: none;
              }

              .anime-info-right {
                margin: 1em 1.5em 1em 0em;
              }

              .btn-back-anime {
                margin: 0 2em 2em 0;
              }
            }

            @media only screen and (min-width: 0px) and (max-width: 425px){
              #jumbotron-title {
                font-size: 1.2em;
              }

              .anime-info-left {
                padding: 0px;
              }

              .info-group {
                padding: 0 15px;
              }

              .anime-cv {
                max-height: 100% !important;
              }

              .anime-cv img {
                max-height: 100% !important;
              }

              .anime-info-right {
                margin: .8em 1em 1em 0.5em;
              }

            }
          </style>
          `;

        if (this._animeformat === "MOVIES"){
          this._dataresult.Page.media.forEach(media => {
              const infoItemElement = document.createElement("info-item");
              infoItemElement.anime = media;
              this.appendChild(infoItemElement);
          })
        } else if (this._animeformat === "MOVIE"){

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
                if (airingSchedules.media.genres.includes("Hentai") === false){
                  const infoItemElement = document.createElement("info-item");
                  infoItemElement.anime = airingSchedules;
                  this.appendChild(infoItemElement);
                  ova = ova + 1;
                }
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