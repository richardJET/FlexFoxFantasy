import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {

    return(
        <footer>
            <div>
                <a href="https://twitter.com/FFBroadcasting" className="twitter" target='_blank' rel='noreferrer'><FontAwesomeIcon icon={faTwitter} /> Follow</a>
                <p>&copy; 2023 Flex Fox Fantasy Federation</p>
            </div>
        </footer>
    )
}

export default Footer;