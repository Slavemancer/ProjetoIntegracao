document.addEventListener("DOMContentLoaded", init);
key = "18484c8fa21a4003ccf38cd09a432aa8";

url = "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=Jack+Reacher";
urlPoster = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";

async function getData(url) {
    return await fetch(url).then((data) => data.json()).then((data) => {
        return data;
    });
}

async function init() {
    dias = document.querySelector("#dias");
    dias.addEventListener("change", addHorarios)

    sessoes = await getData("http://localhost:3000/sessoes/3");

    sessoes.forEach(sessao => {

        value = [];
        value.push(sessao.dia);
        value.push(sessao.horario);
        option = "<option value=" + value + ">" + sessao.dia + "</option>";
        dias.insertAdjacentHTML('beforeend', option);
    });

    setPoster();


}

async function addHorarios(evt) {
    horarios = document.querySelector("#horarios");
    horarios.innerHTML = "";

    if (evt.target.value != "#") {

        horas = evt.target.value.split(",")[1];
        option = "<option value=" + horas + ">" + horas + "h</option>";
        horarios.insertAdjacentHTML('beforeend', option);
    }



}

function setPoster() {

    id = getUrlParameterByName("id");
    posterDiv = document.getElementById("rp");
    getData("http://localhost:3000/filmes/id/" + id).then(function(filme) {

        posterDiv.innerHTML = '<img class="card-img-top" src="' + urlPoster + filme.poster_path + '" alt="Card image cap">';
    });


}

function getUrlParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}