const API_KEY = '6c5e551e74da4ff3ba5b6b9f6f6c6acc';
const API_URL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + API_KEY;

let currentPage = 1;
const pageSize = 5;  

async function fetchNews(page = 1) {
    try {
        const response = await fetch(`${API_URL}&page=${page}&pageSize=${pageSize}`);
        const data = await response.json();

        if (data.status === 'ok') {
            return data.articles;
        } else {
            throw new Error('Failed to fetch articles');
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

function renderArticles(articles) {
    const newsFeed = document.getElementById('news-feed');

    if (currentPage === 1) {
        newsFeed.innerHTML = '';
    }

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');
        articleElement.innerHTML = `
            <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
            <p>${article.description || 'No description available.'}</p>
        `;
        newsFeed.appendChild(articleElement);
    });
}

async function loadMoreArticles() {
    currentPage += 1;
    const articles = await fetchNews(currentPage);
    renderArticles(articles);
}

fetchNews(currentPage).then(articles => renderArticles(articles));