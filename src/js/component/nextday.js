class NextDay extends HTMLElement {
	constructor(){
		super();
	}

	set animeformat(animeformat) {
      this._animeformat = animeformat;
      this.render();
   }
 
	render() {
		const nextDayElement = document.querySelector("next-day");

		if (this._animeformat === "TV"){
			setTimeout(function(){
				$('next-day').show();
				nextDayElement.innerHTML = '<h4 class="next-day"><span class="schedule-next" target="TV2">Tomorow Schedule</span></h4>';
			}, 1000);
		} else if (this._animeformat === "TV2"){
			setTimeout(function(){
				$('next-day').show();
				nextDayElement.innerHTML = '<h4 class="next-day"><span class="schedule-next" target="TV">Today Schedule</span></h4>';
			}, 1000);
		} else {
			nextDayElement.innerHTML = '';
		}
	}
}
customElements.define("next-day", NextDay);
