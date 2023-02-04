import { Link } from 'react-router-dom'

const ArticleHeadlines = ({articles, categories}) => {
    let i = 0; 
    let order = 0;
    
    return(
        articles?
        <ul className='wrapper'>
            {articles.map(({title, mainImage, articleId, bannerSize, category, postSummary}) => {
                if (i < 24){
                    const articleSlug = `/${title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')}`;
                    let categoryColor = 'black';
                    categories.forEach(cat => {
                        if(cat.name === category){
                            categoryColor = cat.color;
                        }
                    });
                    if (bannerSize === 'full'){
                        i = i + 4;
                        if(i % 4 === 0){
                            order = i;
                        } else {
                            order = i-5;
                        }
                    }else{
                        i = i + 2;
                        order = i;
                    }

                    return(
                        <li key={articleId} className={bannerSize} style={{order: order}}>
                            <Link to={articleSlug}>
                                <div className='mainImageContainer'>
                                    <img src={mainImage} alt="to be added"/>
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
        :null
    );
}

export default ArticleHeadlines;