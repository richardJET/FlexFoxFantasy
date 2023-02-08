import { useEffect } from "react";
import { useParams } from "react-router-dom"

const ArticlePage = ({articleData, changeBorderColor}) => {

    const {articles, categories, authors} = articleData
    const { articleSlug } = useParams();
    let categoryColor = '#EBEBEB';
    useEffect(() => {
        changeBorderColor(categoryColor)
    }, [changeBorderColor, categoryColor])

    return(
        articles?
        articles.map(({author, date, keyId, mainImage, category, postBody, title, mainImageDescription}) => {
            if(title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') === articleSlug){
                const stringDate = new Date(date);
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
                    <div key={keyId} className='article'>
                        <img className='bannerImage' src={mainImage} alt={mainImageDescription ? mainImageDescription : `banner for article titled '${title}'`} />
                        <div className='wrapper'>
                            <div className='articleInfo'>
                                <div className='authorImage'>
                                    <img src={authorImage} alt={`Black and white head of ${author}`} style={{border: `2px solid ${categoryColor}`}}/>
                                </div>
                                <div>
                                    <p>{author}</p>
                                    <p>{stringDate.toDateString().split(' ').slice(1).join(' ')}</p>
                                </div>
                            </div>
                            <div className='category' style={{background: categoryColor}}>{category}</div>
                            <h2 className='title'>{title}</h2>
                            <div dangerouslySetInnerHTML={{ __html: postBody }} className='postBody'></div>
                        </div>
                    </div>
                )
            } else return null
        })
        :null
    )
    
}

export default ArticlePage;