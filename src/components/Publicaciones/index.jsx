import React from 'react';
import { connect } from 'react-redux'
import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';
import Spinner from '../General/Spinner'
import Error from '../General/Error'
const { traerTodos: usuariosTraerTodos } = usuariosActions
const { traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesActions

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

        if (!usuarios.length) return;
        if (usuariosReducer.error) return;
        if (publicacionesReducer.cargando) return  <Spinner/>;
        if (publicacionesReducer.Error) return   <Error error={publicacionesReducer.error}/>;
        if (!publicaciones.length) return;
        if (!('publicaciones_key' in usuarios[key])) return;
        
        const { publicaciones_key } = usuarios[key]
        return publicaciones[publicaciones_key].map(publicacion => (
            <div className='pub_title' key={publicacion.id}>
                <h2>{publicacion.title}</h2>
                <p>{publicacion.body}</p>
            </div>
        ));
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
    publicacionesTraerPorUsuario
}
export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones)