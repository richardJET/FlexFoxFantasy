import { Helmet } from "react-helmet";

const Article = ({article, authorImage, categoryColor }) => {
    const { author, articleSlug, date, mainImage, category, postSummary, postBody, title, mainImageDescription } = article;
    const stringDate = new Date(date);
    return (
        <div className='article'>
            <Helmet>

                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://testfoxfantasy.netlify.app/${articleSlug}`} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={postSummary} />
                <meta property="og:image" content={mainImage} />

              
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:domain" value={`https://testfoxfantasy.netlify.app/${articleSlug}`} />
                <meta name="twitter:title" value={title} />
                <meta name="twitter:description" value={postSummary} />
                <meta name="twitter:image" content={mainImage} />
                <meta name="twitter:url" value={`https://testfoxfantasy.netlify.app/${articleSlug}`} />
                <meta name="twitter:label1" value="Author" />
                <meta name="twitter:data1" value={author} />
                <meta name="twitter:label2" value="Category" />
                <meta name="twitter:data2" value={category} />
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