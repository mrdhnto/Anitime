function highlight(section){
	let list = [];
	let next = [];
    let i, nowtime;

    if(section.tipe === "TV"){
      for(i=0;i<section.data.Page.airingSchedules.length;i++){
        if(section.data.Page.airingSchedules[i].media.format === "TV" || section.data.Page.airingSchedules[i].media.format === "TV_SHORT"){
          list.push(section.data.Page.airingSchedules[i].airingAt);
        }
      }
    } else if(section.tipe === "OVA"){
      for(i=0;i<section.data.Page.airingSchedules.length;i++){
        if(section.data.Page.airingSchedules[i].media.format === "OVA" || section.data.Page.airingSchedules[i].media.format === "ONA"){
          list.push(section.data.Page.airingSchedules[i].airingAt);
        }
      }
    } else if(section.tipe === "MOVIE") {
      for(i=0;i<section.data.Page.media.length;i++){
        list.push(section.data.Page.media[i].endDate.day + section.data.Page.media[i].endDate.month + section.data.Page.media[i].endDate.year);
      }
    }

    if(section.tipe === "MOVIE"){
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

}

export default highlight;