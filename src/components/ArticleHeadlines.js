import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faXmark, faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';

const ArticleHeadlines = ({articleData, filterArticles, resetFilter, changeBorderColor}) => {
    
    const {articles, categories, authors} = articleData;
    const { pageNum = 1 } = useParams();
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
        if (e.currentTarget.nextElementSibling.style.display === 'none'){
            e.currentTarget.nextElementSibling.style.display = 'flex'
        } else e.currentTarget.nextElementSibling.style.display = 'none';
    }

    const handleClickClose = e => {
        e.currentTarget.style.display = 'none';
        resetFilter();
        setIsFiltered(false);
    }

    useEffect(() => {
        changeBorderColor('#CCCCCC')
    },[changeBorderColor])

    return(
        articles?
        <div className='wrapper'>
            
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
                    })}
                </select>
            </form>
            <button className='clearFilter' onClick={handleClickClose} style={isFiltered ? {display: 'inline-block'} : {display: 'none'}}>Clear Filter <FontAwesomeIcon icon={faXmark} /></button>
            <ul>
                {articles.map(({title, mainImage, keyId, bannerSize, category, postSummary, mainImageDescription, order}) => {
                    if (order <= 24*pageNum && order > 24*(pageNum - 1)){
                        const articleSlug = `/${title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')}`;
                        let categoryColor = 'black';
                        categories.forEach(cat => {
                            if(cat.name === category){
                                categoryColor = cat.color;
                            }
                        });
                        return(
                            <li key={keyId} className={bannerSize} style={{order: order}}>
                                <Link to={articleSlug}>
                                    <div className='mainImageContainer'>
                                        <img src={mainImage} alt={mainImageDescription ? mainImageDescription : `banner for article titled '${title}'`}/>
                                        <div className='category' style={{background: categoryColor}}>{category}</div>
                                    </div>
                                    <h3>{title}</h3>
                                    <p className='postSummary'>{postSummary}</p>
                                </Link>
                            </li>
                        )
                    }else{ return null }
                })}
            </ul>
            <div className='pageButtons'>
                    {pageNum > 1 ? <Link to={`/page/${parseInt(pageNum, 10) - 1}`} className='previous' ><FontAwesomeIcon icon={faChevronLeft} />Previous</Link> : <div></div> }
                    {pageNum <= Math.floor((articles[articles.length - 1].order / 24)) ? <Link to={`/page/${parseInt(pageNum, 10) + 1}`} className='next'>Next<FontAwesomeIcon icon={faChevronRight} /></Link> : null}
            </div>
        </div>
        :null
    );
}

export default ArticleHeadlines;