import { Fragment, useContext } from 'react';
import Produto from '../components/produtos/Produto';
import ProductContext from '../store/product-context';
import classes from './Produtos.module.css';
import Card from '../components/UI/Card';
import Title from '../components/UI/Title'

const Produtos = () => {
    const productCtx = useContext(ProductContext);

    return (
        <Fragment>
            <Title title='Produtos' />
            <Card>
                <ul className={classes.produtos}>
                    {productCtx.produtos.map((produto) => (
                        <Produto
                            nome={produto.nome}
                            img={produto.img}
                            preco={produto.preco.toFixed(2)}
                            key={produto.id}
                            produto_id={produto.id}
                        />
                    ))}
                </ul>
            </Card>
        </Fragment>
    );
};

export default Produtos;
