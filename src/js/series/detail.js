var app = document.getElementById('app');


var serie_name = null;
var serie_episodes = null;
var serie_seasons = null;
var serie_gender = null;
var serie_image = null;
var serie_description = null;


window.onload = function () {

    var location = window.location;
    let searchParams = new URLSearchParams(location.search);
    var id = searchParams.get('id');

    var url_serie = 'https://api.picta.cu/v2/serie/' + id;
    var url_seasons = 'https://api.picta.cu/v2/temporada/?serie_pelser_id=' + id;

    fetch(url_serie)
        .then(data => data.json())
        .then(data => {

            // console.log(data);

            fetch(url_seasons)
                .then(data => data.json())
                .then(data => {

                    // console.log(data.results);

                    for (s in data.results) {
                        season_id = data.results[s].id;
                        var url_episodes = 'https://api.picta.cu/v2/publicacion/?temporada_id=' + season_id;

                        fetch(url_episodes)
                            .then(data => data.json())
                            .then(data => {

                                console.log(data.results);

                            });

                    }
                });
        });





};



function drawSerie(serie, temporadas, capitulos) {

    serie_name = document.createElement('h1');
    serie_episodes = document.createElement('span');
    serie_seasons = document.createElement('span');
    serie_gender = document.createElement('span');


    serie_image = serie.imagen_secundaria + '_1104x937';


    app.parentElement.style.backgroundImage = 'linear-gradient(rgba(12, 0, 44, 0.1) 0%, rgb(12, 0, 44) 900px), url("' + serie_image + '")';

    serie_name.innerText = serie.nombre;
    serie_seasons.innerText = 'Temporadas: ' + serie.cantidad_temporadas
    serie_episodes.innerText = 'Capitulos: ' + serie.cantidad_capitulos

    app.appendChild(serie_name);
    app.appendChild(serie_seasons);
    app.appendChild(serie_episodes);

}