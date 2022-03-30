import { useReducer } from 'react';

import ProductContext from './product-context';

import computerImg from '../assets/images/computer.webp';
import esteiraImg from '../assets/images/esteira.webp';
import mesaImg from '../assets/images/mesa.webp';
import phoneImg from '../assets/images/phone.webp';
import watchImg from '../assets/images/watch.webp';

const DUMMY_PRODUCTS = [
    {
        id: 1,
        nome: 'Smartwatch Kingwear',
        preco: 194,
        descricao:
            'Suporte em tempo real Informações enviadas do seu celular BT4.0, Sistema Compatível Android 5.0 e superior.',
        img: watchImg,
    },
    {
        id: 2,
        nome: 'Jogo De Mesa Dobrável',
        preco: 600,
        descricao:
            'O Conjunto de Jantar Cíntia é ideal para ambientes compactos proporcionando ótimo aproveitamento de espaço.',
        img: mesaImg,
    },
    {
        id: 3,
        nome: 'Esteira elétrica Kikos',
        preco: 2500,
        descricao: 'Se você quiser melhorar sua saúde, a Kikos é a opção mais adequada.',
        img: esteiraImg,
    },
    {
        id: 4,
        nome: 'Moto E6i Dual SIM 32 GB',
        preco: 750,
        descricao:
            'Suas 2 câmeras traseiras de 13 Mpx/2 Mpx permitirão que você tire fotos mais detalhadas e obtenha efeitos únicos.',
        img: phoneImg,
    },
    {
        id: 5,
        nome: 'Computador Completo Intel Core',
        preco: 2050,
        descricao:
            'Nossos computadores são equipados com os mais recentes processadores de alta velocidade, maximizando sua produção.',
        img: computerImg,
    },
];

const DUMMY_COMMENTS = [
    {
        produto_id: 1,
        nome: 'Phasellus Smirnoff',
        data: new Date(2022, 3, 30),
        comentario:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    },
    {
        produto_id: 2,
        nome: 'Nicolau Flameu',
        data: new Date(2022, 3, 29),
        comentario:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    },
    {
        produto_id: 3,
        nome: 'Dumbledore',
        data: new Date(2022, 3, 28),
        comentario:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    },
];

const defaultproductState = {
    produtos: DUMMY_PRODUCTS,
    comentarios: DUMMY_COMMENTS,
    carrinho: [],
    totalAmount: 0,
};

const productReducer = (state, action) => {
    if (action.type == 'ADD_COMMENT') {
        return {
            produtos: state.produtos,
            carrinho: state.carrinho,
            comentarios: state.comentarios.concat(action.comment),
        };
    }

    if (action.type == 'ADD_CART') {
        const updatedTotalAmount = state.totalAmount + action.product.preco * action.product.quantidade;

        const existingCartItemIndex = state.carrinho.findIndex((item) => item.id === action.product.id);
        const existingCartItem = state.carrinho[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantidade: existingCartItem.quantidade + action.product.quantidade,
            };
            updatedItems = [...state.carrinho];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.carrinho.concat(action.product);
        }

        return {
            produtos: state.produtos,
            comentarios: state.comentarios,
            carrinho: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type == 'REMOVE_CART') {
        const existingCartItemIndex = state.carrinho.findIndex((item) => item.id === action.id);
        const existingItem = state.carrinho[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - (existingItem.preco * existingItem.quantidade);

        const updatedCart = state.carrinho.filter((item) => item.id !== action.id);

        return {
            produtos: state.produtos,
            comentarios: state.comentarios,
            carrinho: updatedCart,
            totalAmount: updatedTotalAmount,
        };
    }

    return defaultproductState;
};

const ProductProvider = (props) => {
    const [productState, dispatchProductAction] = useReducer(productReducer, defaultproductState);

    const addComentarioHandler = (comment) => {
        dispatchProductAction({ type: 'ADD_COMMENT', comment: comment });
    };

    const addToCartHandler = (product) => {
        dispatchProductAction({ type: 'ADD_CART', product: product });
    };

    const removeFromCartHandler = (id) => {
        dispatchProductAction({ type: 'REMOVE_CART', id: id });
    };

    const productContext = {
        produtos: productState.produtos,
        carrinho: productState.carrinho,
        comentarios: productState.comentarios,
        totalAmount: productState.totalAmount,
        addComentario: addComentarioHandler,
        addToCart: addToCartHandler,
        removeFromCart: removeFromCartHandler,
    };

    return <ProductContext.Provider value={productContext}>{props.children}</ProductContext.Provider>;
};

export default ProductProvider;
