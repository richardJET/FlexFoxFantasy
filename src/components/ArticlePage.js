import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Article from "./Article";

const ArticlePage = ({articleData, changeBorderColor}) => {

    const {articles, categories, authors} = articleData
    const { articleSlugLink } = useParams();
    let categoryColor = '#EBEBEB';
    let authorImage = '';
    
    useEffect(() => {
        changeBorderColor(categoryColor)
    }, [changeBorderColor, categoryColor])

    return(
        articles?
        articles.map(article => {
            const { author, category, articleSlug, keyId } = article;
            if(articleSlug === articleSlugLink){
                categories.forEach(eachCategory => {
                    if (eachCategory.categoryName === category) {
                        categoryColor = eachCategory.color;
                    }
                });
                authors.forEach(eachAuthor=>{
                    if(author === eachAuthor.authorName){
                        authorImage = eachAuthor.authorImage;
                    }
                });
                return(
                    <Article key={keyId} article={article} authorImage={authorImage} categoryColor={categoryColor}/>
                )
            } else return null;
        }):null
    ) 
}

export default ArticlePage;