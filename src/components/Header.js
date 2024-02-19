import { Link } from "react-router-dom"
import Login   from "./Login"

const Header = () => {
    return (
        <header className="Header">
            <h1>Blog-Fest</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="post">Post</Link></li>
                    <li><Link to ="login">Login</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header