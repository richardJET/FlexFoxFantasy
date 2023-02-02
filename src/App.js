import './App.css';
import { useState, useEffect } from 'react';
import firebase from './firebase';
import { getDatabase, onValue, query, orderByChild, ref} from 'firebase/database';
import BlogHeadline from './components/BlogHeadline';
import Footer from './components/Footer';


const App = () => {

  const [blogPosts, setBlogPosts] = useState([]);
  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = query(ref(database, 'blogPosts'), orderByChild('date'));
    
    onValue(dbRef, res => {
      const data = res.val();
      const newBlogPosts = [];
      for (let key in data) {
        newBlogPosts.push({...data[key], id: key});
      }
      newBlogPosts.reverse();
      setBlogPosts(newBlogPosts);
    })
  },[]);
  
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path='/' element={ <BlogHeadline blogPosts={blogPosts} /> }/>
        </Routes>
        
      </main>
      <Footer />
    </div>
  );
}

export default App;
