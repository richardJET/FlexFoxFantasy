import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ArticleHeadlines = ({articleData, changeBorderColor, pageButtons, filterForm}) => {
    
    const {articles, categories} = articleData;
    const { pageNum = 1 } = useParams();

    useEffect(() => {
        changeBorderColor('#EBEBEB')
    },[changeBorderColor]);

    return(
        articles
        ? <div className='wrapper'>
            {filterForm()}
            <ul className='headlines'>
                {articles.map(({title, mainImage, keyId, bannerSize, category, postSummary, mainImageDescription, order, articleSlug}) => {
                    if(order <= 24*pageNum && order > 24*(pageNum - 1)){
                        let categoryColor = '#EBEBEB';
                        categories.forEach(eachCategory => {
                            if(eachCategory.categoryName === category){
                                categoryColor = eachCategory.color;
                            }
                        });
                        
                        return(
                            <li key={keyId} className={bannerSize} style={{order: order}}>
                                <Link to={`/${articleSlug}`}>
                                    <div className='mainImageContainer'>
                                        <img src={mainImage ? mainImage : 'https://picsum.photos/1600/900'} alt={mainImageDescription ? mainImageDescription : `banner for article titled '${title}'`}/>
                                        <div className='category' style={{background: categoryColor}}>{category}</div>
                                    </div>
                                    <h3>{title}</h3>
                                    <p className='postSummary'>{postSummary}</p>
                                </Link>
                            </li>
                        )
                    }else return null
                })}
            </ul>
            {pageButtons(pageNum)}
        </div>
        : null
    );
};

export default ArticleHeadlines;