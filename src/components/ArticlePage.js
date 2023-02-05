import { useParams } from "react-router-dom"

const ArticlePage = ({articleData}) => {

    const {articles, categories, authors} = articleData
    const { articleSlug } = useParams();
    return(
        articles?
        articles.map(({author, date, articleId, mainImage, category, postBody, title}) => {
            if(title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') === articleSlug){
                const stringDate = new Date(date);
                let categoryColor = 'black';
                let authorImage ='';
                categories.forEach(cat => {
                    if (cat.name === category) {
                        categoryColor = cat.color;
                    }
                });

                authors.forEach(eachAuthor=>{
                    if(author === eachAuthor.authorName){
                        authorImage = eachAuthor.authorImage;
                    }
                })
                return(
                    <div key={articleId} className='article'>
                        <img className='bannerImage' src={mainImage} alt='placeholder'/>
                        <div className='wrapper'>
                            <div className='articleInfo'>
                                <div className='authorImage'>
                                    <img src={authorImage} alt='placeHolder' style={{border: `2px solid ${categoryColor}`}}/>
                                </div>
                                <div>
                                    <h4>{author}</h4>
                                    <h4>{stringDate.toDateString().split(' ').slice(1).join(' ')}</h4>
                                </div>
                            </div>
                            <div className='category' style={{background: categoryColor}}>{category}</div>
                            <h2>{title}</h2>
                                <div dangerouslySetInnerHTML={{ __html: postBody }}></div>
                        </div>
                    </div>
                )
            } else  return null
        })
        :null
    )
    
}

export default ArticlePage;