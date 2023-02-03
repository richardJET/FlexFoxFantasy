const ArticleHeadlines = ({articles}) => {
    let i = 0; 
    let order = 0;
    return(
        <ul>
            {articles.map(({title, mainImage, id, bannerSize, category, postSummary}) => {
                const categoryClass = `category ${category.replace(/[9 ,']/g, "").toLowerCase()}`;
                if (i < 24){
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
                        <li key={id} className={bannerSize} style={{order: order}}>
                            <div className='mainImageContainer'>
                                <img src={mainImage} alt="to be added"/>
                                <div className={categoryClass}>{category}</div>
                            </div>
                            <h2>{title}</h2>
                            <p className='postSummary'>{postSummary}</p>
                        </li>
                    )
                }else{
                    return(
                        null
                    )
                }
            })}
        </ul>
    );
}

export default ArticleHeadlines;