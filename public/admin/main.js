$(document).ready(function () {
    $("#procurar").click((ev) => {
        update($("#nome").val());
    });
});
apiURL = "http://localhost:3000/"
async function getData(url) {
    return await fetch(url).then((data) => data.json()).then((data) => {
        return data;
    });
}

async function update(string) {
    filmes = await getData(apiURL + "admin/filmes/" + string);
    console.log("a carregar filmes");
    $('#table').html("");
    filmes.forEach(filme => {
        $('#table').html($('#table').html() + '<tr><td>' + filme.title + '</td><td>' + filme.vote_average + '</td><td>' + filme.release_date + '</td><td><button id="' + filme.id + '">Adicionar</button></td></tr>');
        console.log(filme);
    });
    $('button').click(adicionar);
}

async function adicionar(ev) {
    console.log("a adicionar com o id " + ev.target.id);

    fetch(apiURL + "admin/filmes/adicionar/" + ev.target.id, { method: 'POST' }).then((ans) => { console.log(ans.status) });

}
/*<tr>
<td>Tiger Nixon</td>
<td>System Architect</td>
<td>Edinburgh</td>
</tr>*/