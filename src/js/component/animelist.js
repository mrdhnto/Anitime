import './animeitem.js';

class AnimeList extends HTMLElement {

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
      
      const listAnimeElement = document.querySelector("anime-list");
      let day1, day2, month1, month2; 
        listAnimeElement.innerHTML = `
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            .card-header {
              color: #212121;
            }

            h4#section-title {
              margin-bottom: 0px;
            }

            .anime-table {
              max-width: 400px!important;
              margin: 1em auto !important;
            }

            .card-title, #jumbotron-title {
              color: #212121
            }

            .card-title:hover{
              cursor: pointer;
            }

            h5.card-title, h5.air-eps, h5.air-time {
              font-size: 0.9rem!important;
            }

            tr.anime-title, td.anime-title {
              height: max-content;
              padding-bottom: 0px !important;
            }

            tr.anime-desc {
              height: min-content;
            }

            tr.anime-info {
              height: max-content;
            }

            .card-img-overlay {
              padding: 0px;
            }

            h5.air-eps, h5.air-time {
              text-align: center;
              color: #fff;
              padding: 0.3em 0;
              width: 100%;
              background-color: #131417b8;
              margin: 0px;
            }

            .card {
              color: #5c728a;
              margin-bottom: 1em;
            }

            .card-body {
              padding: 0.5rem 1rem;
            }

            .card .card-body .card-text {
              font-size: 0.7rem;
              overflow: hidden;
               text-overflow: ellipsis;
               display: -webkit-box;
               -webkit-line-clamp: 8;
               -webkit-box-orient: vertical;
            }

            .anime-cover img {
              min-height: 100%;
              max-width: 100%;
              object-fit: cover;
              object-position: center;
            }


          </style>
          `;

          $('.loading').hide();

        if (this._animeformat === "MOVIE"){
          
          this._dataresult.Page.media.forEach(media => {
            if (media.endDate.day !== null && media.endDate.month !== null){
              const animeItemElement = document.createElement("anime-item");
              animeItemElement.className = "col pb-0 anime-table animated fadeIn";
              animeItemElement.anime = media;
              this.appendChild(animeItemElement);
            }
          })
          
        } else {

          this._dataresult.Page.airingSchedules.forEach(airingSchedules => {

            if (this._animeformat === "TV") {
              if (airingSchedules.media.format === "TV" || airingSchedules.media.format === "TV_SHORT") {
                const animeItemElement = document.createElement("anime-item");
                animeItemElement.className = "col pb-0 anime-table animated fadeIn";
                animeItemElement.anime = airingSchedules;
                this.appendChild(animeItemElement);

              }
            } else if (this._animeformat === "TV2") {
              if (airingSchedules.media.format === "TV" || airingSchedules.media.format === "TV_SHORT") {
                const animeItemElement = document.createElement("anime-item");
                animeItemElement.className = "col pb-0 anime-table animated fadeIn";
                animeItemElement.anime = airingSchedules;
                this.appendChild(animeItemElement);

              }
            } else if (this._animeformat === "OVA") {
              if (airingSchedules.media.format === "OVA" || airingSchedules.media.format === "ONA") {
                if (airingSchedules.media.genres.includes("Hentai") === false){
                  const animeItemElement = document.createElement("anime-item");
                  animeItemElement.className = "col pb-0 anime-table animated fadeIn";
                  animeItemElement.anime = airingSchedules;
                  this.appendChild(animeItemElement);
                }
              }

            }
          })
      
        }

   }

   
}
 
customElements.define("anime-list", AnimeList);