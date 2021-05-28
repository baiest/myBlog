import React from 'react';
import { connect } from 'react-redux'
import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';
import Spinner from '../General/Spinner'
import Error from '../General/Error'
import Comentarios from './Comentarios'

const { traerTodos: usuariosTraerTodos } = usuariosActions
const { 
    traerPorUsuario: publicacionesTraerPorUsuario,
    abrirCerrar,
    traerComentarios
} = publicacionesActions

class Publicaciones extends React.Component{
    async componentDidMount(){
        const { key } = this.props.match.params
        if (!this.props.usuariosReducer.usuarios.length ){
            await this.props.usuariosTraerTodos()       
        }
        if(!this.props.usuariosReducer.error){
            if (!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])){
                this.props.publicacionesTraerPorUsuario(key)
            }
        }
    }

    ponerUsuario = () => {
        const { 
            usuariosReducer,
            publicacionesReducer,
            match: { params: { key }}
        } = this.props

        if(!usuariosReducer.usuarios.length || usuariosReducer.cargando){
            return <Spinner/>
        }

        if(publicacionesReducer.error){
            return <Error error={publicacionesReducer.error}/>
        }
        const nombre = usuariosReducer.usuarios[key].name
        return (
            <h3>Publicaciones de: {nombre}</h3>
        )
    }

    ponerPublicaciones = () => {
        const {
            usuariosReducer,
            usuariosReducer: { usuarios },
            publicacionesReducer,
            publicacionesReducer: { publicaciones },
            match: { params: { key }}
        } = this.props;

        if (publicacionesReducer.cargando 
            || !usuarios.length
            || !publicaciones.length) return  <Spinner/>;
        if (publicacionesReducer.Error
            || usuariosReducer.error) return   <Error error={publicacionesReducer.error || usuariosReducer.error}/>;
        if (!('publicaciones_key' in usuarios[key])) return;
        
        const { publicaciones_key } = usuarios[key]
        return this.mostrarInfo(publicaciones[publicaciones_key], publicaciones_key);
    } 

    mostrarInfo = (publicaciones, pub_key) => (
        publicaciones.map((publicacion, com_key) => (
            <div className='pub_title' key={publicacion.id} onClick={()=> this.mostrarComentarios(pub_key, com_key, publicacion.comentarios)}>
                <h2>{publicacion.title}</h2>
                <p>{publicacion.body}</p>
                { publicacion.abierto && <Comentarios comentarios={publicacion.comentarios}/>}
            </div>
    )));

    mostrarComentarios = (pub_key, com_key, comentarios=[]) => {
        this.props.abrirCerrar(pub_key, com_key)
        if (!comentarios.length){
            this.props.traerComentarios(pub_key, com_key)
        }
    }

    render(){
        return(
            <div>
                { this.ponerUsuario() }
                { this.ponerPublicaciones() }
            </div>
        );
    }
}

const mapStateToProps = ({usuariosReducer, publicacionesReducer}) => {
    return {
        usuariosReducer,
        publicacionesReducer
    }
        
};

const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesTraerPorUsuario,
    abrirCerrar,
    traerComentarios
}
export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones)