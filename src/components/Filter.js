import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faXmark } from '@fortawesome/free-solid-svg-icons';


const Filter = ({resetFilter, articleData, filterArticles }) => {
    const { categories, authors } = articleData;
    const navigate = useNavigate();
    const [isFiltered, setIsFiltered] = useState(false);
    
    
    const handleChange = e => {
        navigate('/')
        e.target.parentElement.style.display = 'none';
        let filterBy = e.target[0].value;
        let filterValue = e.target.value;
        filterArticles(filterBy, filterValue);
        setIsFiltered(true);
        e.target.selectedIndex = 0;
    }
    
    const handleClickSlider = e => {
        if (e.currentTarget.nextElementSibling.style.display === 'none') {
            e.currentTarget.nextElementSibling.style.display = 'flex'
        } else e.currentTarget.nextElementSibling.style.display = 'none';
    }
    
    const handleClickClose = e => {
        e.currentTarget.style.display = 'none';
        resetFilter();
        setIsFiltered(false);
    }
    return(
        <div className='filter'>
            <button onClick={handleClickSlider}><FontAwesomeIcon icon={faSliders} /> Filter</button>
            <form className='filterMenu' action='#'>
                <select defaultValue='author' onChange={handleChange}>
                    <option disabled value='author'>Author</option>
                    {authors.map(({authorName, keyId}) => {
                        return(
                            <option key={keyId} value={authorName}>{authorName}</option>
                        )
                    })}

                    </select>
                    <select defaultValue='category' onChange={handleChange}>
                        <option disabled value='category'>Category</option>
                        {categories.map(({ name, keyId }) => {
                            return (
                                <option key={keyId} value={name}>{name}</option>
                            )
                        })};
                    </select>
                </form>
                <button className='clearFilter' onClick={handleClickClose} style={isFiltered ? { display: 'inline-block' } : { display: 'none' }}>Clear Filter <FontAwesomeIcon icon={faXmark} /></button>
        </div>
    )
}

export default Filter;