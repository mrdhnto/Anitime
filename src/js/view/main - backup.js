import '../component/animelist.js';
import '../component/infolist.js';
import '../component/nextday.js';
import DataSource from '../data/data-source.js';

let animeformat;
let list = [];

function main(keyword){
  
  let schedule = {
      start: 0,
      end: 0
    };

  animeformat = keyword;

  if (keyword === "TV" || keyword === "OVA"){
    schedule = {
      start: moment().startOf('day').unix(),
      end: moment().endOf('day').unix()
    }
  } else if (keyword === "TV2"){
    schedule = {
      start: moment().startOf('day').add(1, 'day').unix(),
      end: moment().endOf('day').add(1, 'day').unix()
    }
  } else if (keyword === "MOVIE"){
    schedule = {
      start: moment().startOf('day').format('YYYYMMDD'),
      end: moment().endOf('day').add(2, 'week').format('YYYYMMDD')
    }
  }

   		DataSource.searchAnime(schedule)
     	.then(renderResult)
     	.catch(fallbackResult)
 
};
 
function renderResult(results) {

      let i;
      list = [];
      if(animeformat === "TV"){
        for(i=0;i<results.Page.airingSchedules.length;i++){
          if(results.Page.airingSchedules[i].media.format === "TV" || results.Page.airingSchedules[i].media.format === "TV_SHORT"){
            list.push(results.Page.airingSchedules[i].airingAt);
          }
        }
      } else if(animeformat === "OVA"){
        for(i=0;i<results.Page.airingSchedules.length;i++){
          if(results.Page.airingSchedules[i].media.format === "OVA" || results.Page.airingSchedules[i].media.format === "ONA"){
            list.push(results.Page.airingSchedules[i].airingAt);
          }
        }
      } else if(animeformat === "MOVIE") {
        for(i=0;i<results.Page.media.length;i++){
          list.push(results.Page.media[i].endDate.day + results.Page.media[i].endDate.month + results.Page.media[i].endDate.year);
        }
      }

    const animeListElement = document.querySelector("anime-list");
      animeListElement.dataresult = results;
      animeListElement.animeformat = animeformat;

    const animeInfoElement = document.querySelector("anime-info");
      animeInfoElement.dataresult = results;
      animeInfoElement.animeformat = animeformat;

    const nextDayElement = document.querySelector("next-day");
      nextDayElement.animeformat = animeformat;
      
      nextaired();
};
 
function nextaired(){
    let i, nowtime;
    let next = [];

    if(animeformat === "MOVIE"){

      nowtime = moment().format('YYYYMMDD');
      for(i=0; i<list.length; i++){
        if(list[i] > nowtime){
          next.push(list[i])
        }
      }
      $('.' + next[0]).addClass("next-aired");

    } else {

      nowtime = moment().unix();
      for(i=0; i<list.length; i++){
        if(list[i] > nowtime){
          next.push(list[i])
        }
      }
      $('.' + next[0]).addClass("next-aired");

    }  
};

function fallbackResult(message) {
       alert('Error, check console');
       console.error(message);
};

export default main;