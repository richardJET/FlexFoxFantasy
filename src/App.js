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
  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database)
    
    onValue(dbRef, res => {
      const data = res.val();
      const newArticleData = {};
      for (let key in data) {
        newArticleData[key] = [];
        for (let id in data[key]){

          newArticleData[key].push({...data[key][id], articleId: id});
        }
      }

      setArticleData(newArticleData);     
    })
  },[]);
 
  return (
    <div className="App">
      <Header categories={articleData.categories}/>
      <main>
        <Routes>
          <Route path='/' element={<ArticleHeadlines articles={articleData.articles} categories={articleData.categories} /> }/>
          <Route path='/:articleSlug' element = { <ArticlePage articleData={articleData} /> } />
        </Routes>
        
      </main>
      <Footer />
    </div>
  );
}

export default App;
