import { Link } from "react-router-dom";

const Header = () => {
    return(
        <header className='wrapper'>
            <div>
                <Link to='/'>

                <img src='https://daks2k3a4ib2z.cloudfront.net/58902785379867da07104d40/589604aafaafd8103e63a629_icon-p-130x130q80.jpeg' alt='Flex Fox Fantasy logo'/>
                </Link>
                <h1>Flex Fox Fantasy</h1>
            </div>
            <nav>
                <ul>
                    <li>
                        <a href='https://docs.google.com/spreadsheets/d/1e28Bongr6CXDT68zFWCtZDyRCYVNqETXX8O51zBms-0/' target='_blank' rel='noreferrer'>Standings</a>
                    </li>
                    <li>
                        <a href='https://soundcloud.com/flex-fox-broadcasting' target='_blank' rel='noreferrer'>Podcast</a>
                    </li>
                    <li>    
                        <a href='https://fantasy.espn.com/baseball/league?leagueId=545' target='_blank' rel='noreferrer'>ESPN</a>
                    </li>
                    <li>
                        <a href='https://docs.google.com/spreadsheets/d/1jxtRmrwK6dbMQTS-PDn8l6hDHG0AlPYVtcVyxngG34U/' target='_blank' rel='noreferrer'>Minor Leagues</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;