export default class DataSource {

  static searchAnime(schedule) {
    
    let date = moment().startOf('day').format('YYYYMMDD');
    let query, variables;


    if (schedule.start === date) {
      query = `
        query ($page: Int, $perPage: Int, $start: FuzzyDateInt, $end: FuzzyDateInt) {
          Page (page:$page, perPage: $perPage) {
            media (startDate_greater: $start, endDate_lesser:$end, format: MOVIE) {
              id
              title {
                romaji
              }
              description
              format
              episodes
              duration
              studios {
                nodes {
                  name
                }
              }
              genres
              coverImage {
                large
              }
              bannerImage
              startDate {
                year
                month
                day
              }
              endDate {
                year
                month
                day
              }
              
            }
          }
        }
      `;

      variables = {
        start: schedule.start,
        end: schedule.end,
        page: 1,
        perPage: 50
      };

    } else {
      query = `
        query ($page: Int, $perPage: Int, $start: Int, $end: Int) {
          Page(page:$page, perPage: $perPage){
            airingSchedules(airingAt_greater: $start, airingAt_lesser: $end, sort: TIME) {
              id
              mediaId
              media{
                id
                title {
                  romaji
                }
                format
                description
                episodes
                duration
                studios {
                  nodes {
                    name
                  }
                }
                genres
                coverImage {
                  large
                }
                bannerImage
                startDate {
                  year
                  month
                  day
                }
              }
              episode
              airingAt
            }
          }
        }
      `;

      variables = {
        start: schedule.start,
        end: schedule.end,
        page: 1,
        perPage: 50
      };

    }


    let url = 'https://graphql.anilist.co',
      options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          body: JSON.stringify({
              query: query,
              variables: variables
          })
      };



    return fetch(url, options)
      .then(response => {
        return response.json();
      })
      
      .then(responseJson => {
        if(responseJson.data) {
                return Promise.resolve(responseJson.data);
              } else {
                return Promise.reject(`Check Console`);
              }
      })

  }

}
