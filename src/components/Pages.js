import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Pages = ({articles, pageNum}) => {
    return(
        <div className='pageButtons'>
            {pageNum > 1 ? <Link to={`/page/${parseInt(pageNum, 10) - 1}`} className='previous' ><FontAwesomeIcon icon={faChevronLeft} />Previous</Link> : <div></div>}
            {pageNum <= Math.floor((articles[articles.length - 1].order / 24)) ? <Link to={`/page/${parseInt(pageNum, 10) + 1}`} className='next'>Next<FontAwesomeIcon icon={faChevronRight} /></Link> : null}
        </div>
    )
}

export default Pages;