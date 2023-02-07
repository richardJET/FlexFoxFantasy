import './App.css';
import { useState, useEffect } from 'react';
import firebase from './firebase';
import { getDatabase, onValue, ref} from 'firebase/database';
import { Route, Routes } from 'react-router-dom';
import ArticleHeadlines from './components/ArticleHeadlines';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticlePage from './components/ArticlePage';


const App = () => {
  
  const [articleData, setArticleData] = useState({});
  const [originalArticleData, setOriginalArticleData] = useState({});

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
      let i = 0;
      let order = 0;
      newArticleData.articles = newArticleData.articles.map(article => {
        if (article.bannerSize === 'full') {
          i = i + 4;
          if (i % 4 === 0) {
            order = i;
          } else {
            order = i - 5;
          }
        }else {
          i = i + 2;
          order = i;
        }
        return(
          {...article, order: order }
        )
      })
      console.log(newArticleData)
      setOriginalArticleData(newArticleData);
      setArticleData(newArticleData);     
    })
  },[]);

  const filterArticles = (filterBy, filterValue) => {
    const filteredArticleData = {...originalArticleData};
    const filteredArticles = filteredArticleData.articles.filter(article => {
      return article[filterBy] === filterValue
    })

    let i = 0;
    let order = 0;
    filteredArticleData.articles = filteredArticles.map(article => {
      if (article.bannerSize === 'full') {
        i = i + 4;
        if (i % 4 === 0) {
          order = i;
        } else {
          order = i - 5;
        }
      } else {
        i = i + 2;
        order = i;
      }
      return (
        { ...article, order: order }
      )
    });
    console.log(filteredArticleData);
    setArticleData(filteredArticleData);
  }

  const resetFilter = () => setArticleData(originalArticleData);
 
  return (
    <div className="App">
      <Header categories={articleData.categories}/>
      <main>
        <Routes>
          <Route path='/' element={<ArticleHeadlines articleData={articleData} filterArticles={filterArticles} resetFilter={resetFilter}/> }/>
          <Route path='/:articleSlug' element = { <ArticlePage articleData={articleData} /> } />
          <Route path='/page/:pageNum' element={<ArticleHeadlines articleData={articleData} filterArticles={filterArticles} resetFilter={resetFilter} />} />
        </Routes>
        
      </main>
      <Footer />
    </div>
  );
}

export default App;
