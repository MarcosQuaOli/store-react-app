import { Fragment, useContext } from 'react';
import Card from '../components/UI/Card';
import Title from '../components/UI/Title';
import ProductContext from '../store/product-context';
import classes from './Cart.module.css';
import trashIcon from '../assets/images/trash.svg';

const Cart = () => {
    const productCtx = useContext(ProductContext);

    const { totalAmount } = productCtx;

    const removeProdutoHandler = (id) => {
        productCtx.removeFromCart(id);
    };

    return (
        <Fragment>
            <Title title="Carrinho" />
            <Card>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Total</th>
                            <th>Remover</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productCtx.carrinho.map((produto, index) => (
                            <tr key={index}>
                                <td>
                                    <div className={classes.table_product}>
                                        <img src={produto.img} alt={produto.nome} /> {produto.nome}
                                    </div>
                                </td>
                                <td>R$ {produto.preco.toFixed(2)}</td>
                                <td>{produto.quantidade}</td>
                                <td>R$ {(produto.preco * produto.quantidade).toFixed(2)}</td>
                                <td>
                                    <button onClick={removeProdutoHandler.bind(null, produto.id)}>
                                        <img src={trashIcon} alt="trash icon" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            <div className={classes.total}>
                <span>TOTAL:</span>
                <span>R$ {totalAmount.toFixed(2)}</span>
            </div>
        </Fragment>
    );
};

export default Cart;
