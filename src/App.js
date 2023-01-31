import './App.css';
import { useState, useEffect } from 'react';
import firebase from './firebase';
import { getDatabase, onValue, ref} from 'firebase/database';
import BlogHeadline from './components/BlogHeadline';

const App = () => {

  const [blogPosts, setBlogPosts] = useState([]);
  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    onValue(dbRef, res => {
      const data = res.val().blogPosts;
      const newBlogPosts = [];
      for (let key in data) {
        newBlogPosts.push(data[key]);
      }
      setBlogPosts(newBlogPosts);
    })
  },[]);
  
  return (
    <div className="App">
      <h1>Flex Fox Fantasy</h1>
      <BlogHeadline blogPosts={blogPosts}/>
    </div>
  );
}

export default App;
