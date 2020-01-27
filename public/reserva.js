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
    filmeId = getUrlParameterByName("id");
    getData("http://localhost:3000/sessoes/" + filmeId).then(function(sessoes) {

        sessoes.forEach(sessao => {

            value = [];
            value.push(sessao.dia);
            value.push(sessao.horario);
            value.push(sessao.filmeId);
            option = "<option value=" + value + ">" + sessao.dia + "</option>";
            dias.insertAdjacentHTML('beforeend', option);
        });
    });



    setPoster();



    getData("http://localhost:3000/loginInfo").then(function(username) {

        if (username == "erro") {
            document.getElementById("divLoginReq").style.visibility = "visible";
            document.getElementById("divBtnRegistar").style.visibility = "hidden";

        } else {
            document.getElementById("divLoginReq").style.visibility = "hidden";
            document.getElementById("divBtnRegistar").style.visibility = "visible";


        }
    });



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

        console.log(filme.poster_path);

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