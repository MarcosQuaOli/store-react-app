import { useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ProductContext from '../../store/product-context';
import classes from './Comentario.module.css';

const Comentario = () => {
    const params = useParams();
    const nomeInputRef = useRef();
    const comentarioInputRef = useRef();
    const comentariosCtx = useContext(ProductContext);

    const { comentarios } = comentariosCtx;

    const comentariosFiltrados = comentarios.filter((comentarios) => {
        return comentarios.produto_id == params.produto_id;
    });

    const submitFormHandler = (event) => {
        event.preventDefault();

        const data = {
            produto_id: params.produto_id,
            nome: nomeInputRef.current.value,
            data: new Date(),
            comentario: comentarioInputRef.current.value,
        };

        comentariosCtx.addComentario(data);

        comentarioInputRef.current.value = ''
        nomeInputRef.current.value = ''
    };

    return (
        <div className={classes.comentarios}>
            {comentariosFiltrados.map((comentario, index) => (
                <div key={index}>
                    <p>
                        <span className={classes.comentarios_nome}>{comentario.nome} - </span>
                        <span>{comentario.data.toLocaleDateString('pt-br')}</span>
                    </p>
                    <p>{comentario.comentario}</p>
                </div>
            ))}
            <div className={classes.comentarios_form}>
                <p>De sua opinião:</p>
                <form action="" onSubmit={submitFormHandler}>
                    <input type="text" ref={nomeInputRef} placeholder="Nome" />
                    <textarea
                        name="comentario"
                        id="comentario"
                        ref={comentarioInputRef}
                        rows="10"
                        placeholder="Mensagem"
                    ></textarea>

                    <button>Enviar</button>
                </form>
            </div>
        </div>
    );
};

export default Comentario;
