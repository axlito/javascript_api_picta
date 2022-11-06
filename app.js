var button = document.getElementById('button');
var app = document.getElementById('app');
var url = 'https://api.picta.cu/v2/serie/';
var posts = null;


window.onload = function () {


    fetch(url)
        .then(data => data.json())
        .then(data => {
            data = data.results;
            for (d in data) {
                posts = data[d];
                create(posts);

            }
        })

};

function create(post) {
    container = document.createElement('a');
    separator = document.createElement('br');
    tags = document.createElement('div');
    post_details = document.createElement('div');

    post_name = document.createElement('span');
    post_seasons = document.createElement('span');
    post_year = document.createElement('span');
    post_gender = "";

    src = post.imagen_secundaria + '_300x200';

    container.setAttribute('href', url + post.pelser_id)
    container.setAttribute('class', 'container');
    post_details.setAttribute('class', 'container__details');
    post_name.setAttribute('class', 'details__name');
    post_seasons.setAttribute('class', 'details__seasons');
    post_year.setAttribute('class', 'details__year');
    tags.setAttribute('class', 'details__tags');



    container.style.backgroundImage = 'url("' + src + '")';

    post_name.innerText = post.nombre;
    post_seasons.innerText = 'Temporadas: ' + post.cantidad_temporadas;
    post_year.innerText = 'Año: ' + post.ano;


    post_details.appendChild(post_name);
    post_details.appendChild(post_seasons)
    post_details.appendChild(post_year)


    for (aux in post.genero) {
        post_gender = document.createElement('span');
        post_gender.setAttribute('class', 'tags__gender');
        post_gender.innerText = post.genero[aux].nombre;
        tags.appendChild(post_gender)
    }

    post_details.appendChild(tags);
    container.appendChild(post_details)
    app.appendChild(container)

}