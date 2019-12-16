document.addEventListener("DOMContentLoaded", init);
key = "18484c8fa21a4003ccf38cd09a432aa8";

url = "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=Jack+Reacher";

async function init() {
    $("#movie-data").hide();
    await getData(url);
    document.querySelector("#procurarFilme").addEventListener("input", sugerirFilme);
}

async function getData(url) {
    return await fetch(url).then((data) => data.json()).then((data) => {
        return data;
    });
}

async function sugerirFilme(ev) {
    filmesInput = document.querySelector("#filmes");
    filmesInput.innerHTML = "";
    if (ev.target.value == "") return;
    results = await getData("https://api.themoviedb.org/3/search/movie?api_key=" + key + "&language=en-US&query=" + ev.target.value + "&page=1&include_adult=true");
    filmes = results.results;
    for (filme of filmes) {
        option = document.createElement("option");
        option.value = filme.original_title;
        filmesInput.appendChild(option);
    }

}