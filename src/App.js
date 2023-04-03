import { useState, useEffect } from 'react';
import { getDatabase, onValue, ref} from 'firebase/database';
import { Route, Routes } from 'react-router-dom';
import firebase from './firebase';
import ArticleHeadlines from './components/ArticleHeadlines';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticlePage from './components/ArticlePage';
import Pages from './components/Pages';
import Filter from './components/Filter';
import './App.css';
import Post from './components/Post';


const App = () => {
  
  const [articleData, setArticleData] = useState({});
  const [originalArticleData, setOriginalArticleData] = useState({});
  const [articleColor, setArticleColor] = useState('#EBEBEB');

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database)

    onValue(dbRef, res => {
      const data = res.val();
      const newArticleData = {};
      for (let key in data) {
        newArticleData[key] = [];
        for (let id in data[key]){
          newArticleData[key].push({...data[key][id], keyId: id});
        }
      }
      newArticleData.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
      newArticleData.articles = addPropertiesToObject(newArticleData.articles)
      setOriginalArticleData(newArticleData);
      setArticleData(newArticleData);     
    })
  },[]);

  const filterArticles = (filterBy, filterValue) => {
    const filteredArticleData = {...originalArticleData};
    const filteredArticles = filteredArticleData.articles.filter(article => article[filterBy] === filterValue)
    filteredArticleData.articles = addPropertiesToObject(filteredArticles);
    setArticleData(filteredArticleData);
  }

  const addPropertiesToObject = articles => {
    let i = 0; // amount of spce on page taken by article headline
    let order = 0;
    return(
    articles.map( article => {
      if (article.bannerSize === 'full') {
        i = i + 4;
        i % 4 === 0 ? order = i : order = i - 5;
      } else {
        i = i + 2;
        order = i;
      }
      return (
        { ...article, order: order, articleSlug: `${article.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')}` }
      )
    }))
  }

  const filterForm = () => <Filter resetFilter={resetFilter} filterArticles={filterArticles} articleData={articleData} originalArticles={originalArticleData.articles} />
  const resetFilter = () => setArticleData(originalArticleData);
  const changeBorderColor = categoryColor => setArticleColor(categoryColor);
  const pageButtons = pageNum => <Pages articles={articleData.articles} pageNum={pageNum} />;

  return (
    <div className="App">
      <Header articleColor={articleColor}/>
      <main>
        <Routes>
          <Route path='/' element={<ArticleHeadlines articleData={articleData} changeBorderColor={changeBorderColor} pageButtons={pageButtons} filterForm={filterForm}/> }/>
          <Route path='/new-article' element={<Post articleData={articleData} changeBorderColor={changeBorderColor} />} />
          <Route path='/:articleSlugLink' element = { <ArticlePage articleData={articleData} changeBorderColor={changeBorderColor}/> } />
          <Route path='/page/:pageNum' element={<ArticleHeadlines articleData={articleData} changeBorderColor={changeBorderColor} pageButtons={pageButtons} filterForm={filterForm} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
