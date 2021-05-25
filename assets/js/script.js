// variable declarations start here
var musicSearch = function () {
    //variable declarations end here
    var searchArtistEl = document.querySelector("#artistEntry").value.trim();
    var searchTrackEl = document.querySelector("#trackEntry").value.trim();
        fetch (
            'http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=' + searchArtistEl + '&track=' + searchTrackEl + '&api_key=81f35ca97ccc4666d2af29e3c5709eba&format=json'
        )
    
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response.data[0]);
    
            for (i = 0; i < response.similartracks.track.length; i++) {
    
                document.querySelector('#artist').innerHTML = response.similartracks.track[i].artist.name;
                document.querySelector('#title').innerHTML = response.similartracks.track[i].name;
            }
        });
    }