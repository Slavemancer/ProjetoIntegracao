document.addEventListener("DOMContentLoaded", init);
key = "18484c8fa21a4003ccf38cd09a432aa8";

url = "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=Jack+Reacher";
urlPoster = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";

async function init() {
    $("#movie-data").hide();
    await getData(url);
    document.querySelector("#procurarFilme").addEventListener("input", sugerirFilme);
    indexFilmes();
}

async function getData(url) {
    return await fetch(url).then((data) => data.json()).then((data) => {
        return data;
    });
}

async function sugerirFilme(ev) {
    filmesInput = document.querySelector("#filmes");
    //filmesInput.innerHTML = "";
    filmesDiv = document.querySelector("#filmesDiv");

    if (ev.target.value == "") {
        $("#filmesDiv").hide();
        return;
    }
    filmesDiv.innerHTML = "";

    filmes = await getData("http://localhost:3000/filmes/titulo/" + ev.target.value);


    for (filme of filmes) {
        //option = document.createElement("option");
        //option.value = filme.original_title;
        //filmesInput.appendChild(option);
        //option = '<option class="dropdown-item" value="' + filme.id + '"><a href="#" class="dropdown-item">' + filme.original_title + '</a></option>'
        option = '<a id="ahref' + filme.id + '" href="#" class="dropdown-item">' + filme.original_title + '</a>';
        filmesDiv.insertAdjacentHTML('beforeend', option);
    }
    hrefs = filmesDiv.children;
    for (href of hrefs)
        href.addEventListener("click", carregarFilme)
    $("#filmesDiv").show();

}

async function carregarFilme(ev) {
    id = ev.target.id.substring(5);
    filme = await getData("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + key + "&language=en-US");
    document.querySelector("#movie-img").src = "https://image.tmdb.org/t/p/w500/" + filme.poster_path;
    document.querySelector("#movie-title").innerText = filme.original_title;
    document.querySelector("#movie-text").innerText = filme.overview;

}

async function sugerirFilmeAPI(ev) {
    filmesInput = document.querySelector("#filmes");
    //filmesInput.innerHTML = "";
    filmesDiv = document.querySelector("#filmesDiv");

    if (ev.target.value == "") {
        $("#filmesDiv").hide();
        return;
    }
    filmesDiv.innerHTML = "";
    results = await getData("https://api.themoviedb.org/3/search/movie?api_key=" + key + "&language=en-US&query=" + ev.target.value + "&page=1&include_adult=true");

    if (!results.total_results) {
        $("#filmesDiv").hide();
        return;
    }
    filmes = results.results;
    for (filme of filmes) {
        //option = document.createElement("option");
        //option.value = filme.original_title;
        //filmesInput.appendChild(option);
        //option = '<option class="dropdown-item" value="' + filme.id + '"><a href="#" class="dropdown-item">' + filme.original_title + '</a></option>'
        option = '<a id="ahref' + filme.id + '" href="#" class="dropdown-item">' + filme.original_title + '</a>';
        filmesDiv.insertAdjacentHTML('beforeend', option);
    }
    hrefs = filmesDiv.children;
    for (href of hrefs)
        href.addEventListener("click", carregarFilme)
    $("#filmesDiv").show();

}

async function indexFilmes() {

    posterDiv = document.querySelector("#posters");
    filmesAll = await getData("http://localhost:3000/filmes");

    filmesAll.forEach(filme => {

        row = '<div class="card" style="width: 18rem;">\
                <a href="reserva.html?id=' + filme.id + '">\
                    <img class="card-img-top" src="' + urlPoster + filme.poster_path + '" alt="Card image cap">\
                </a>\
                <div class="card-body">\
                    <p class="card-text">' + filme.original_title + '</p>\
                    <p class="card-text">Rating: ' + filme.vote_average + '</p>\
                </div>\
            </div>'
        posterDiv.insertAdjacentHTML('beforeend', row);
    });

}