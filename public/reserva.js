document.addEventListener("DOMContentLoaded", init);
key = "18484c8fa21a4003ccf38cd09a432aa8";

url = "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=Jack+Reacher";

async function getData(url) {
    return await fetch(url).then((data) => data.json()).then((data) => {
        return data;
    });
}

async function init() {
    dias = document.querySelector("#dias");
    dias.addEventListener("change", function() { console.log(dias.value) })

    sessoes = await getData("http://localhost:3000/sessoes/3");

    sessoes.forEach(sessao => {

        value = [];
        value.push(sessao.dia);
        value.push(sessao.horario);
        option = "<option value=" + value + ">" + sessao.dia + "</option>";
        dias.insertAdjacentHTML('beforeend', option);
    });


}