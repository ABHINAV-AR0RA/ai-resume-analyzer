import {Link} from "react-router";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link className="text-2xl font-bold text-gradient" to="/">RESUMIND</Link>
            <Link className="primary-button w-fit" to="/upload">Upload resume</Link>
        </nav>
    )
}
export default Navbar
