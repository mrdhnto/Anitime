import '../component/animelist.js';
import '../component/infolist.js';
import '../component/nextday.js';
import DataSource from '../data/data-source.js';
import highlight from './highlight.js';

let animeformat;

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

    let section = {
      data: results,
      tipe: animeformat
    };

    const animeListElement = document.querySelector("anime-list");
      animeListElement.dataresult = results;
      animeListElement.animeformat = animeformat;

    const animeInfoElement = document.querySelector("anime-info");
      animeInfoElement.dataresult = results;
      animeInfoElement.animeformat = animeformat;

    const nextDayElement = document.querySelector("next-day");
      nextDayElement.animeformat = animeformat;
      
    highlight(section);
};
 
function fallbackResult(message) {
       alert('Error, check console');
       console.error(message);
};

export default main;