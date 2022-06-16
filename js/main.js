const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        'api_key': API_KEY,
    }
});

function printMovie(movies, container) {
    container.innerHTML = "";

    movies.forEach(element => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${element.id}`;
        });

        const movieImage = document.createElement('img');
        movieImage.classList.add('movie-img');
        movieImage.setAttribute('alt', element.title);
        movieImage.setAttribute('src', `https://image.tmdb.org/t/p/w300${element.poster_path}`);

        movieContainer.appendChild(movieImage);
        container.appendChild(movieContainer);
    });
}

function printCategories(category, container) {
    container.innerHTML = "";
    category.forEach(element => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${element.id}`);
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${element.id}-${element.name}`;
        });
        const categoryTitleText = document.createTextNode(element.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}

async function getTrendingMoviesPreview() {
    const { data } = await api("/trending/movie/day");

    const movies = data.results;
    printMovie(movies, trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
    const { data } = await api("/genre/movie/list");

    const categories = data.genres;

    printCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(id) {
    const { data } = await api("discover/movie", {
        params: {
            with_genres: id,
        },
    });

    const movies = data.results;
    printMovie(movies, genericSection);
}

async function getMoviesBySearch(query) {
    const { data } = await api("search/movie", {
        params: {
            query: query,
        },
    });

    const movies = data.results;
    printMovie(movies, genericSection);
}

async function getTrendingMovies() {
    const { data } = await api("/trending/movie/day");

    const movies = data.results;
    printMovie(movies, genericSection);
}

async function getMovieById(id) {
    const { data } = await api(`movie/${id}`);

    const movieImg = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    headerSection.style.background = `
        linear-gradient(
            180deg, 
            rgba(0, 0, 0, 0.35) 19.27%, 
            rgba(0, 0, 0, 0) 29.17%
        ),
        url(${movieImg})`;
    movieDetailTitle.textContent = data.title;
    movieDetailDescription.textContent = data.overview;
    movieDetailScore.textContent = data.vote_average;

    printCategories(data.genres, movieDetailCategoriesList);

    getRelatedMoviesById(id);
}

async function getRelatedMoviesById(id) {
    const { data } = await api(`movie/${id}/similar`);
    const relatedMovies = data.results;

    printMovie(relatedMovies, relatedMoviesContainer);
    relatedMoviesContainer.scrollTo(0, 0);
}
