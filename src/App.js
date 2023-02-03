import './App.css';
import { useState, useEffect } from 'react';
import firebase from './firebase';
import { getDatabase, onValue, ref} from 'firebase/database';
import { Route, Routes } from 'react-router-dom';
import ArticleHeadlines from './components/ArticleHeadlines';
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => {

  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database)
    
    onValue(dbRef, res => {
      const data = res.val();
      const newArticles = [];
      const newCategories = [];
      for (let key in data.articles) {
        newArticles.push({...data.articles[key], id: key});
      }
      for (let key in data.categories) {
        newCategories.push({ category: data.categories[key], id:key })
      }

      setArticles(newArticles);
      setCategories(newCategories);
      
    })
  },[]);
  
  return (
    <div className="App">
      <Header categories={categories}/>
      <main className='wrapper'>
        <Routes>
          <Route path='/' element={ <ArticleHeadlines articles={articles} /> }/>
        </Routes>
        
      </main>
      <Footer />
    </div>
  );
}

export default App;
