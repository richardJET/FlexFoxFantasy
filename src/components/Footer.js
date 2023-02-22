import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
    return(
        <footer>
            <div className='wrapper'>
                <a href='https://twitter.com/FFBroadcasting' className='twitter' target='_blank' rel='noreferrer'><FontAwesomeIcon icon={faTwitter} /> Follow</a>
                <p>&copy; 2023 Flex Fox Fantasy Federation</p>
                <p className='credit'>Developed by <a href='https://richardtillo.com/' target='_blank' rel='noreferrer'>Richard Tillo</a></p>
            </div>
        </footer>
    )
}

export default Footer;