import { Link } from 'react-router-dom';
import classes from './Produto.module.css';

const Produtos = (props) => {
    return (
        <li>
            <Link to={`${props.produto_id}`} className={classes.produto_link}>
                <h2>{props.nome}</h2>
                <div className={classes.produto_img}>
                    <img src={props.img} alt={props.nome} />
                </div>
                <h3>R$ {props.preco}</h3>
            </Link>
        </li>
    );
};

export default Produtos;
