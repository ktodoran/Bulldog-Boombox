var searchArtistEl = document.querySelector("#artistEntry").value.trim();
var searchTrackEl = document.querySelector("#trackEntry").value.trim();

$(document).ready(function(){
    $('.modal').modal();
});
// function to pull data from user search and fetch from last.fm API
var generatePlaylist = function () {
    
    document.getElementById("list").style.display = "";
    document.getElementById("searchbutton").style.display = "none";
    document.getElementById("resultsbutton").style.display = "block";
    
    var searchArtistEl = document.querySelector("#artistEntry").value.trim();
    var searchTrackEl = document.querySelector("#trackEntry").value.trim();

    fetch(
        'https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=' + searchArtistEl + '&track=' + searchTrackEl + '&api_key=81f35ca97ccc4666d2af29e3c5709eba&format=json&limit=30'
    )

    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        console.log(response);

        for (i = 0; i < response.similartracks.track.length; i++) {
            var bodyEl = document.getElementById("body");
            var rowEl = document.createElement("tr");
            var artistEl = document.createElement("td");

            artistEl.textContent = response.similartracks.track[i].artist.name;
                
            var titleEl = document.createElement("td");

            titleEl.textContent = response.similartracks.track[i].name;
            artistEl.id = "artistInfo";

            rowEl.appendChild(artistEl);
            rowEl.appendChild(titleEl);

            bodyEl.appendChild(rowEl);
        }

    })
}

// pull from wikipedia API for the artist searched
function generateInformation() {
    document.getElementById("container").style.display = "block";
    document.getElementById("resultsbutton").style.display = "none";
    var searchArtistEl = document.querySelector("#artistEntry").value.trim();

fetch (`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchArtistEl}`)
        .then(response => response.json())
        .then(data => {
            const results = data.query.search;
        displayResults(results);
        });

    function displayResults(results) {
        document.getElementById("container").style.display = "block";
        var searchResults = document.querySelector('.artistResult');
        searchResults.innerHTML = '';
        var result = results[0];
        var url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);
        
            searchResults.insertAdjacentHTML('beforeend',
            `<div class="resultItem">
            <h3 class="resultItem-title">
                <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
            </h3>
            <span class="resultItem-snippet">${result.snippet}</span><br>
            </div>`
        );
    }
}