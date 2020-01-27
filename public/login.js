document.addEventListener("DOMContentLoaded", init);

async function init() {

    await getData("http://localhost:3000/loginInfo").then(function(username) {

        if (username != "erro") {
            window.location.replace("index.html");
        }
    });

}


async function getData(url) {
    return await fetch(url).then((data) => data.json()).then((data) => {
        return data;
    });
}