import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner'
import Error from '../General/Error'

const Comentarios = (props) => {
    if (props.com_cargando) return <Spinner />
    if (props.com_error) return <Error error={props.com_error} />
    const ponerComentarios = () => (
        props.comentarios.map(comentario => (
            <ul key={comentario.id}>
                <i>{ comentario.email }</i>
                <p>{ comentario.body }</p>
            </ul>
        ))
    );

    return ponerComentarios();
};

const mapStateToProps = ({ publicacionesReducer }) => publicacionesReducer

export default connect(mapStateToProps)(Comentarios);