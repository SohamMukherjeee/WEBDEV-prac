const API_KEY="6e6d663f2e494c60b03c39ffdd6e444e";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("India"));
function reload(){
    window.location.reload();
}
async function fetchNews(query) {
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await res.json();
    console.log(data);
    
    bindData(data.articles);
}
function bindData(articles){
    const cardsContainer=document.getElementById('cards-container');
    const templatenews=document.getElementById('template-news-card');
    cardsContainer.innerHTML='';

    articles.forEach(article => {
        if(!article.urlToImage)return;
        const cardClone=templatenews.content.cloneNode(true);
        filldata(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function filldata(cardClone,article){
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsdesc=cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsSource.innerHTML=article.source.name;
    newsdesc.innerHTML=article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} - ${date}`;
    
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })
}
let currentNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    currentNav?.classList.remove('active');
    currentNav=navItem;
    currentNav.classList.add('active');
}
const searhBttn=document.getElementById('search-bttn');
const inputText=document.getElementById('search-text');

searhBttn.addEventListener('click',()=>{
    const query=inputText.value;
    if(!query)return;
    fetchNews(query);
    currentNav?.classList.remove('active');
    currentNav=null;
})