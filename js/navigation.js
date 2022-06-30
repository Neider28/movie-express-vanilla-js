searchFormBtn.addEventListener('click', () => {
    location.hash = `#search=${searchFormInput.value.split(" ").join('')}`;
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends=';
});

headerTitle.addEventListener('click', () => {
    location.hash = '#home';
});

arrowBtn.addEventListener('click', () => {
    const stateLoad = window.history.state ? window.history.state.loadUrl : '';
    searchFormInput.value = "";
    if (stateLoad.includes('#')) {
        window.location.hash = '';
    } else {
        window.history.back();
    }
});

window.addEventListener('DOMContentLoaded',
    () => {
        navigator();
        window.history.pushState({ loadUrl: window.location.href }, null, '');
    }, 
    false);

window.addEventListener('hashchange', navigator, false);
var mediaqueryList = window.matchMedia("(min-width: 1023px)");

function navigator() {
    if(location.hash.startsWith('#trends=')) {
        trendsPage();
    } else if(location.hash.startsWith('#search=')) {
        search();
    } else if(location.hash.startsWith('#movie=')) {
        moviePage();
    } else if(location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        location.hash = '#home';
        homePage();
    }

    document.documentElement.scrollTop = 0;
}

function homePage() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    footer.classList.remove('inactive');
    searchFormInput.value = "";
    getTrendingMoviesPreview();  
    getCategoriesPreview();
}

function categoriesPage() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    headerTitle.classList.remove('inactive');
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    genericSection.style.margin = '20px 0px';

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    headerCategoryTitle.innerHTML = categoryName.replace('%20', ' ');
    getMoviesByCategory(categoryId);
    footer.classList.remove('inactive');
}

function moviePage() {
    headerSection.classList.add('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    footer.classList.add('inactive');

    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId);
}

function search() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    if(searchFormInput.value === '') {
        printNotFound();
    }
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
    footer.classList.remove('inactive');
}

function trendsPage() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias';
    getTrendingMovies();
}