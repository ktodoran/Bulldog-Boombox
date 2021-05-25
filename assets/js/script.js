// variable declarations start here
var musicSearch = function () {
    //variable declarations end here
        var searchTermEl = document.querySelector("#userEntry").value.trim();
        fetch (
            'https://api.giphy.com/v1/gifs/search?api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&q=' + searchTermEl + '&limit=30'
        )
    
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response.data[0]);
    
            for (i = 0; i < response.data.length; i++) {
    
                var cellEl = document.querySelector("#artist");
    
                cellEl.innerHTML = "";
    
                var gifImg = document.createElement('img');
                gifImg.setAttribute('src', response.data[i].images.fixed_height.url);
                cellEl.append(gifImg);
    
                document.querySelector('#title').innerHTML = response.data[i].title;
            }
        });
    }