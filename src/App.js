import classes from './App.module.css';
import Header from './components/Layout/Header';
import { Routes, Route, Navigate } from 'react-router-dom';
import Produtos from './pages/Produtos';
import ProdutosDetalhes from './pages/ProdutosDetalhes';
import Cart from './pages/Cart';
import Login from './pages/Login';
import ProductProvider from './store/ProductProvider';

const App = () => {
    return (
        <ProductProvider>
            <div className={classes.wrapper}>
                <Header />

                <main className={classes.main}>
                    <Routes>
                        <Route path="/" element={<Navigate to="produtos" replace />} />
                        <Route path="produtos" element={<Produtos />} />
                        <Route path="produtos/:produto_id" element={<ProdutosDetalhes />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="login" element={<Login />} />
                    </Routes>
                </main>
            </div>
        </ProductProvider>
    );
};

export default App;
