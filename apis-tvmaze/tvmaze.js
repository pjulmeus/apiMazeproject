"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");
const $episodeList = $("#episodesList")
const $epButton = $(".btn btn-outline-light btn-sm Show-getEpisodes")  
const $showData = $("#data-show-id")

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  let shows = []
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  const res = await axios.get("http://api.tvmaze.com/search/shows/", {params:{q: term}})
    // let showsRunner = res.data.show;
    // const {name, summary, image} = showsRunner;
    // console.log(showsRunner)
      for (let showData of res.data){
          let showsRunner = showData.show;
          const {id,name, summary, image} = showsRunner;
          shows.push({id, name, summary, image})
      }
//   return [
//     {
//       id: 1767,
//       name: "The Bletchley Circle",
//       summary:
//         `<p><b>The Bletchley Circle</b> follows the journey of four ordinary
//            women with extraordinary skills that helped to end World War II.</p>
//          <p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their
//            normal lives, modestly setting aside the part they played in
//            producing crucial intelligence, which helped the Allies to victory
//            and shortened the war. When Susan discovers a hidden code behind an
//            unsolved murder she is met by skepticism from the police. She
//            quickly realises she can only begin to crack the murders and bring
//            the culprit to justice with her former friends.</p>`,
//       image:
//         "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
//     }
//   ];
console.log(shows)
 return shows
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  
  $showsList.empty();
  
  for (let show of shows) {
    const $ulEpisodeList = $(".media-body")
    const ul = document.createElement('ul')
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
            <img class="card-img-top" src=${show.image.medium}>
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes" id="${show.id}">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `);
    ul.setAttribute("id", `${show.id}`)
    $ulEpisodeList.append(ul)
    $showsList.append($show);
  } 

  const $showData = $("div.Show.col-md-12.col-lg-6.mb-4")
  console.log($showData);
  const showId = $showData.data("show-id")
  console.log(showId);
  const $epButton = $("button.btn.btn-outline-light.btn-sm.Show-getEpisodes") 

$epButton.on("click", handleClick)
    //   evt.preventDefault()
    //   let idShow = evt.target.id;
    //   console.log(idShow);
    //   $episodesArea.show()
    //   const resultEpis = await getEpisodesOfShow(idShow)
    //   populateEpisodes(resultEpis)
    //   // use the element of data-show-id 
    // })
  console.log($epButton);
  // if a handle click event happended here and an id was sent over
}

async function handleClick(evt){
  evt.preventDefault()
      let idShow = evt.target.id;
      console.log(idShow);
      $episodesArea.show()
      const resultEpis = await getEpisodesOfShow(idShow)
      populateEpisodes(resultEpis)
      $epButton.off("click", handleClick)
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */
// crreate a click event that 
async function getEpisodesOfShow(id) { 
  let episodes = []
  const ep = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
    for (let epis of ep.data){
      const { id, name, season, number } = epis
      episodes.push({id, name, season, number})
  }
    return episodes
}

/** Write a clear docstring for this function... */

function populateEpisodes(episodes) { 
  for(let e of episodes){
    console.log(e)
    let newList = document.createElement('li');
    newList.innerText = `${e.name} (Season: ${e.season}, Episode: ${e.number})}`
    const ulAddEpis = $(`ul.${e.id}`)
    $episodeList.append(newList)
  }
  $epButton.off("click", handleClick)
}

// function handleClick(evt) { 
//   getEpisodesOfShow(id)
// }
// Next, write a function, populateEpisodes, which is provided an array of episodes info, and populates that into the #episodes-list part of the DOM.

// The episodes list is a simple <ul>, and the individual episodes can just be basic <li> elements, like <li>Pilot (season 1, number 1)</li>.

// (Also, now that we have episodes, you’ll need to reveal the #episodes-area, which is initially hidden!)

// Add an “Episodes” button at the bottom of each show card

// Add a click handler that listens for clicks on those buttons.

// You’ll need to make sure this eventlistener works even though the shows won’t be present in the initial DOM
// You’ll need to get the show ID of the show for the button you clicked. To do this, you can read about getting data attributes with jQuery and also how to use jQuery to find something a few levels up in the DOM
// Then, this should use your getEpisodes and populateEpisodes functions.