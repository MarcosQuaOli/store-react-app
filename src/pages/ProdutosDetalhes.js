import { Fragment, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductContext from '../store/product-context';
import Card from '../components/UI/Card';
import Title from '../components/UI/Title';
import { Link } from 'react-router-dom';
import classes from './ProdutosDetalhes.module.css';
import Comentario from '../components/comentarios/Comentario';

const ProdutosDetalhes = () => {
    const productCtx = useContext(ProductContext);
    const params = useParams();
    const [quantidadeInput, setQuantidadeInput] = useState(1);
    const [showDescricao, setShowDescricao] = useState(true);
    let navigate = useNavigate();

    const produto = productCtx.produtos.filter((produto) => {
        return produto.id == params.produto_id;
    });

    const addQuantityHandler = () => {
        if (quantidadeInput >= 999) {
            setQuantidadeInput(999);
        } else {
            setQuantidadeInput(quantidadeInput + 1);
        }
    };

    const removeQuantityHandler = () => {
        if (quantidadeInput <= 0) {
            setQuantidadeInput(0);
        } else {
            setQuantidadeInput(quantidadeInput - 1);
        }
    };

    const quantidadeInputHandler = (event) => {
        setQuantidadeInput(parseInt(event.target.value));
    };

    const showDescricaoHandler = () => setShowDescricao(true);

    const showComentariosHandler = () => setShowDescricao(false);

    const addToCartHandler = () => {
        const data = {
            quantidade: quantidadeInput,
            nome: produto[0].nome,
            img: produto[0].img,
            preco: produto[0].preco,
            id: produto[0].id,
        };

        productCtx.addToCart(data);

        navigate("/cart");
    };

    return (
        <Fragment>
            <Title title="Detalhes do produto" />

            <ol className={classes.breadcrumb}>
                <li>
                    <Link to="/produtos">Home</Link>
                </li>
                <li>
                    <Link to="/produtos">Produtos</Link>
                </li>
                <li>
                    <Link to="#">{produto[0].nome}</Link>
                </li>
            </ol>

            <Card>
                <div className={classes.detalhes}>
                    <img src={produto[0].img} alt={produto[0].nome} />

                    <div className={classes.info}>
                        <h2>{produto[0].nome}</h2>
                        <h3>
                            Price: <span className={classes.info_preco}>R${produto[0].preco}</span>
                        </h3>

                        <div className={classes.info_quantidade}>
                            <button onClick={removeQuantityHandler}>-</button>
                            <input
                                type="number"
                                min="0"
                                max="999"
                                value={quantidadeInput}
                                onChange={quantidadeInputHandler}
                            />
                            <button onClick={addQuantityHandler}>+</button>
                        </div>

                        <div>
                            <button className={classes.info_button} onClick={addToCartHandler}>
                                Adicionar ao carrinho
                            </button>
                        </div>
                    </div>
                </div>
            </Card>

            <div className={classes.gap} />

            <div className={classes.tab}>
                <div className={classes.tab_buttons}>
                    <button className={showDescricao ? classes.active : ''} onClick={showDescricaoHandler}>
                        Descrição
                    </button>
                    <button className={!showDescricao ? classes.active : ''} onClick={showComentariosHandler}>
                        Comentários
                    </button>
                </div>

                <div className={classes.tab_textos}>
                    {showDescricao && (
                        <div className={classes.tab_descricao}>
                            <h3>Descrição do Produto</h3>
                            <p>{produto[0].descricao}</p>
                        </div>
                    )}

                    {!showDescricao && <Comentario />}
                </div>
            </div>
        </Fragment>
    );
};

export default ProdutosDetalhes;
