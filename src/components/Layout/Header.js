import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className={classes.header}>
            <div>
                <NavLink to="/">StoreApp</NavLink>
            </div>

            <nav className={classes.header_nav}>
                <NavLink className={(navData) => navData.isActive ? classes.active : ''} to="produtos">Produtos</NavLink>
                <NavLink className={(navData) => navData.isActive ? classes.active : ''} to="cart">Carrinho</NavLink>
            </nav>

            <div>
                <NavLink className={(navData) => navData.isActive ? classes.active : ''} to="login">Login</NavLink>
            </div>
        </header>
    );
};

export default Header;
