const app = document.querySelector('.app');
const navbar = document.querySelector('.navbar');
const menu = document.querySelector('.menu');
const observer = document.querySelector('.observer');


const search = document.querySelector('.options__search');
const overlay = document.querySelector('.overlay');


let categories = [];
let series = [];
let search_result = [];

let page = 1;

let url = 'https://api.picta.cu/v2/serie/?format=json&page=' + page + '&page_size=30';
let search_url = 'https://api.picta.cu/v2/serie/?nombre='

// const url = '/db.json';


window.onload = () => {

    new IntersectionObserver(async (entries) => {
        const index = entries.findIndex(elm => elm.isIntersecting);
        if (index >= 0) {
            await fetchData(url);
            fillMenu(categories, null);

            create(series);
            page++;
            url = 'https://api.picta.cu/v2/serie/?format=json&page=' + page + '&page_size=30';
        }
    }).observe(observer);

};


async function fetchData(url) {
    return fetch(url)
        .then(data => data.json())
        .then(data => {
            let newCategories = data.results.map((value) => {
                series.push(value);
                return value.genero.map((genero) => genero.nombre)
            });
            newCategories = newCategories.reduce((current, next) => current.concat(next));
            categories = [...new Set([...categories, ...newCategories])];
        });
}


const fillMenu = (cat, res) => {

    menu.innerHTML = '';

    cat.forEach(element => {
        tags = document.createElement('span');
        tags.setAttribute('class', 'menu__tag');
        tags.innerText = element;
        menu.appendChild(tags);
    });

    if (res) {

        res.forEach(element => {
            row = document.createElement('div');
            row_image = document.createElement('img');
            row_details = document.createElement('div');
            details_name = document.createElement('span');
            details_seasons = document.createElement('span');

            row.setAttribute('class', 'menu__row');
            row_image.setAttribute('class', 'row__image');
            row_details.setAttribute('class', 'row_details');
            details_name.setAttribute('class', 'details_name');
            details_seasons.setAttribute('class', 'details_seasons');

            row_image.src = element.imagen_secundaria + '_300x200';
            details_name.innerText = element.nombre;
            details_seasons.innerText = `Temporadas: ${element.cantidad_temporadas}`;

            row_details.appendChild(details_name);
            row_details.appendChild(details_seasons);

            row.appendChild(row_image);
            row.appendChild(row_details);
            menu.appendChild(row);
        });
    }
};




function create(series) {
    series.forEach(post => {


        container = document.createElement('a');
        separator = document.createElement('br');
        tags = document.createElement('div');
        post_details = document.createElement('div');

        post_name = document.createElement('span');
        post_seasons = document.createElement('span');
        post_year = document.createElement('span');
        post_gender = "";

        src = post.imagen_secundaria + '_300x200';

        container.setAttribute('href', 'content/series/details.html?id=' + post.pelser_id)
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

        load();

    });

}

function move(card, index) {
    setTimeout(() => {
        card.setAttribute('class', 'container loaded');
    }, 80 * index);
}

function load() {
    cards = document.querySelectorAll('.container:not(.loaded)');

    // for (c in cards) {
    //     move(cards[c], c);
    // }
    cards.forEach((observer, index) => {
        move(observer, index);
    });
}





document.querySelector('.app').onmousemove = e => {

    const rect = e.target.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;

    if (e.target.getAttribute('class') === 'container loaded') {
        e.target.style.setProperty('--mouse-x', `${x}px`);
        e.target.style.setProperty('--mouse-y', `${y}px`);
    }

}

let timer = null;

function searchName() {
    timer = setTimeout(() => {

        if (search.value !== '') {

            return fetch(`${search_url}*${search.value}*`)
                .then(data => data.json())
                .then(data => {
                    console.log(data);

                    fillMenu(categories, data.results);

                });
        } else {
            fillMenu(categories, '');
        }

    }, 750);
}

search.addEventListener('input', () => {
    clearTimeout(timer)
    searchName();
});


search.addEventListener('focus', () => {

    menu.style.pointerEvents = 'fill';
    menu.style.opacity = '1';
    overlay.style.pointerEvents = 'fill';
    overlay.style.opacity = '1';

    menu.style.transform = 'translateX(-50%)'


    navbar.style.backgroundColor = 'var(--transparent)';
    navbar.style.boxShadow = '0 .06em 1em .1em var(--transparent)';
    navbar.style.backdropFilter = 'unset';

    document.body.style.overflowY = 'hidden';

});


overlay.addEventListener('click', () => {

    menu.style.pointerEvents = 'none';
    menu.style.opacity = '0';

    menu.style.transform = 'translateX(calc(-50% + 3px))'

    overlay.style.pointerEvents = 'none';
    overlay.style.opacity = '0';


    navbar.style.backgroundColor = 'var(--dblue-5)';
    navbar.style.boxShadow = '0 .06em 1em .1em var(--black)';
    navbar.style.backdropFilter = 'var(--blur-l)';

    document.body.style.overflowY = 'auto'

});