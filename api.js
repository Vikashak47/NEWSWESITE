const apiKey = '7959e3fda5db4003b4c7b8b7e5143a7e';
const apiUrlBase = 'https://newsapi.org/v2/top-headlines';
const searchUrlBase = 'https://newsapi.org/v2/everything'; 
const heroTitle = document.getElementById('hero-title');
const newsContainer = document.getElementById('news-container');

async function fetchNews(category = 'general') {
    const apiUrl = `${apiUrlBase}?country=us&category=${category}&pageSize=10&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 'ok') {
            displayNews(data.articles);
        } else {
            console.error('Failed to fetch news:', data);
        }
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

async function searchNews(query) {
    const searchUrl = `${searchUrlBase}?q=${encodeURIComponent(query)}&pageSize=10&apiKey=${apiKey}`;

    try {
        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data.status === 'ok') {
            displayNews(data.articles);
        } else {
            console.error('Failed to search news:', data);
        }
    } catch (error) {
        console.error('Error searching news:', error);
    }
}

function displayNews(articles) {
    newsContainer.innerHTML = ''; 

    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>No news articles found.</p>';
        return;
    }


    

    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
            <h3>${article.title}</h3>
            <p class="time">Published at: ${new Date(article.publishedAt).toLocaleString()}</p>
            <p>${article.description || 'No summary available.'}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;

        newsContainer.appendChild(card);
    });
}

const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const category = link.dataset.category;

        heroTitle.textContent = category === 'general' ? 'Welcome to Daily News' : `Latest ${category.replace('-', ' ')} News`;

        fetchNews(category);
    });
});

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
searchButton.addEventListener('click', () => {
    handleSearch();
});

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
        heroTitle.textContent = `Search Results for: "${query}"`;
        searchNews(query);
    }
}

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        heroTitle.textContent = `Search Results for: "${query}"`;
        searchNews(query);
    }
});

fetchNews();
