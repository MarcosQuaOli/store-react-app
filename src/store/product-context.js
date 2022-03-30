import React from 'react';

const ProductContext = React.createContext({
    produtos: [],
    comentarios: [],
    carrinho: [],
    totalAmount: 0,
    addComentario: (comment) => {},
    addToCart: (product) => {},
    removeFromCart: (id) => {},
});

export default ProductContext;
