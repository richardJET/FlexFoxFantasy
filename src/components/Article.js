import { Helmet } from "react-helmet";

const Article = ({article, authorImage, categoryColor }) => {
    const { author, date, mainImage, category, postSummary, postBody, title, mainImageDescription } = article;
    const stringDate = new Date(date);
    return (
        <div className='article'>
            <Helmet>
                <Helmet>
                    <meta
                        name="description"
                        content = {`${title} - ${postSummary}`}
                    />
                </Helmet>
            </Helmet>
            <img className='bannerImage' src={mainImage ? mainImage : 'https://picsum.photos/1600/900'} alt={mainImageDescription ? mainImageDescription : `banner for article titled '${title}'`} />
            <div className='wrapper'>
                <div className='articleInfo'>
                    <div className='authorImage'>
                        <img src={authorImage} alt={`Black and white head of ${author}`} style={{ border: `2px solid ${categoryColor}` }} />
                    </div>
                    <div>
                        <p>{author}</p>
                        <p>{stringDate.toDateString().split(' ').slice(1).join(' ')}</p>
                    </div>
                </div>
                <div className='category' style={{ background: categoryColor }}>{category}</div>
                <h2 className='title'>{title}</h2>
                <div dangerouslySetInnerHTML={{ __html: postBody }} className='postBody'></div>
            </div>
        </div>
    )
}

export default Article;