import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faXmark } from '@fortawesome/free-solid-svg-icons';


const Filter = ({resetFilter, articleData, filterArticles, originalArticles }) => {
    const { categories, authors, articles } = articleData;
    const navigate = useNavigate();
    const [isFiltered, setIsFiltered] = useState(originalArticles.length === articles.length ? false : true);
    const [visibleForm, setVisibleForm] = useState(false);
    authors.sort((a, b) => a.authorName.localeCompare(b.authorName));
    categories.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
    
    const handleChange = e => {
        navigate('/')
        e.target.parentElement.style.display = 'none';
        filterArticles(e.target[0].value, e.target.value);
        setIsFiltered(true);
        e.target.selectedIndex = 0;
    }
    
    const handleClickClose = () => {
        navigate('/');
        resetFilter();
        setIsFiltered(false);
    }
    return(
        <div className='filter'>
            <button onClick={() => visibleForm ? setVisibleForm(false) : setVisibleForm(true)}><FontAwesomeIcon icon={faSliders} /> Filter</button>
            {visibleForm 
            ? <form className='filterMenu' action='#' name='filterMenu'>
                <label htmlFor='filterAuthor'></label>
                <select id='filterAuthor' defaultValue='author' onChange={handleChange} name='filterMenu'>
                    <option disabled value='author'>Author</option>
                    {authors.map(({authorName, keyId}) => {
                        return(
                            <option key={keyId} value={authorName}>{authorName}</option>
                        )
                    })}

                    </select>
                    <label htmlFor='filterCategory'></label>
                    <select id='filterCategory' defaultValue='category' onChange={handleChange}>
                        <option disabled value='category'>Category</option>
                        {categories.map(({ categoryName, keyId }) => {
                            return (
                                <option key={keyId} value={categoryName}>{categoryName}</option>
                            )
                        })};
                    </select>
                </form>
            : null}
            {isFiltered 
            ? <button className='clearFilter' onClick={handleClickClose}>Clear Filter <FontAwesomeIcon icon={faXmark} /></button>
            : null}
        </div>
    )
}

export default Filter;