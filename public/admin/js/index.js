$(document).ready(function () {
    update();
});
apiURL = "http://localhost:3000/"
async function getData(url) {
    return await fetch(url).then((data) => data.json()).then((data) => {
        return data;
    });
}

async function update() {


    filmes = await getData(apiURL + "filmes");
    row = "<tr>";
    filmes.forEach(filme => {
        row += "<td>" + filme.title + "</td>" + "<td>" + filme.vote_average + "</td>" + "<td>" + filme.release_date + "</td></tr>"
    });
    console.log(filmes);
    $('#tbody').html(row);
}
/*<tr>
<td>Tiger Nixon</td>
<td>System Architect</td>
<td>Edinburgh</td>
</tr>*/