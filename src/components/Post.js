import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import MenuBar from './MenuBar';
import Article from './Article';
import { useState, useEffect } from 'react';
import firebase from "../firebase";
import { getDatabase, push, ref } from "firebase/database";
import { useNavigate } from 'react-router';


const Post = ({articleData, changeBorderColor}) => {

    const {categories, authors} = articleData;
    const [newArticle, setNewArticle] = useState(
        localStorage.getItem('newArticle') 
        ? JSON.parse(localStorage.getItem('newArticle'))
        :{ author: 'Flex Fox', bannerSize: 'half', category: 'The Weekly Show', createdOn: '', date: '', mainImage: '', postBody: '', postSummary: '', title: ''});
    const [formSubmit, setFormSubmit] = useState(false);
    const [saveForm, setSaveForm] = useState(false);
    const [categoryColor, setCategoryColor] = useState('#f72566');
    const [authorImage, setAuthorImage] = useState('https://daks2k3a4ib2z.cloudfront.net/58902786379867da07104d62/589188bdc31bf340043bfa18_flex.png');
    const navigate = useNavigate();
    
    useEffect(() => {
        changeBorderColor(categoryColor)
    }, [changeBorderColor, categoryColor])

    const previewArticle = e => {
        e.preventDefault();
        setNewArticle({ ...newArticle, postBody: editor.getHTML(), createdOn: (new Date()).toString(), date: (new Date()).toString() });
        setFormSubmit(true); 
        setSaveForm(false);  
    }

    const changeCategory = e => {
        setNewArticle({
            ...newArticle, category: e.target.value })
       categories.forEach(eachCategory => {
           if (eachCategory.categoryName === e.target.value) {
               setCategoryColor(eachCategory.color);
           }
       })
        setSaveForm(false);
    }

    const changeAuthor = e => {
        setNewArticle({
            ...newArticle, author: e.target.value
        })
        authors.forEach(eachAuthor => {
            if (eachAuthor.authorName === e.target.value) {
                setAuthorImage(eachAuthor.authorImage);
            }
        })
        setSaveForm(false);
    }

    const publishArticle = () => {
        const database = getDatabase(firebase);
        const childRef = ref(database, 'articles');
        push(childRef, newArticle)
        navigate('/');
    }

    const save = () => {
        localStorage.setItem('newArticle', JSON.stringify(newArticle))
        setSaveForm(true);
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Link,
            Youtube,
        ],
        content: newArticle.postBody,
        onUpdate({ editor }) {
            setNewArticle({ ...newArticle, postBody: editor.getHTML() })
            setSaveForm(false);
        }
    })

    return(
        formSubmit ? 
        <>
            <Article article={newArticle} authorImage={authorImage} categoryColor={categoryColor}/>
            <div className='wrapper previewButtons'>
                <button type='button' onClick={() => setFormSubmit(false)}>Back</button>
                <button type='button' className='publish' onClick={publishArticle}>Publish</button>
            </div>
        </>
        : <form className='wrapper' onSubmit={previewArticle}>
            <h2>New Article</h2>
            <label htmlFor='title' className='required'>Title</label>
            <input id='title' defaultValue={newArticle.title} onChange={e => {setNewArticle({...newArticle, title: e.target.value})}} required></input>
            <label htmlFor='mainImage'>Main Image</label>
                <input 
                    defaultValue={newArticle.mainImage} 
                    id='mainImage' 
                    onChange={e => { setNewArticle({ ...newArticle, mainImage: e.target.value }) }} 
                    type="url" 
                    pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)(.jpg|.png|.gif)"
                ></input>
            <label htmlFor='categories'>Category</label>
            <select value={newArticle.category} id='categories' onChange={changeCategory}>
                {categories?
                 categories.map(({ categoryName, keyId }) => {
                    return (
                        <option key={keyId} value={categoryName}>{categoryName}</option>
                    )
                }):null}
            </select>
            <label htmlFor='authors'>Author</label>
            <select id='authors' onChange={changeAuthor} value={newArticle.author}>
                {authors?
                 authors.map(({ authorName, keyId }) => {
                    return (
                        <option key={keyId} value={authorName}>{authorName}</option>
                    )
                }):null}
            </select>
            <label htmlFor='postSummary'>Post Summary</label>
            <textarea defaultValue={newArticle.postSummary} id='postSummary' onChange={e => { setNewArticle({ ...newArticle, postSummary: e.target.value }) }} rows="3"></textarea>
            <label>Post Body</label>
            <div className='textEditor'>
                <MenuBar editor={editor} />
                <EditorContent editor={editor} />
            </div>
            <div className='previewButtons'>
                    <button type='button' onClick={save} className={saveForm ? 'saved' : 'save'}>{saveForm ? 'Saved \u2713'  : 'Save'}</button>
                <button type='submit' className='preview'>Preview</button>
            </div>
        </form>
    )
}

export default Post;