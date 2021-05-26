import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as usuariosActions from '../../actions/usuariosActions';
import Spinner from '../General/Spinner'
import Error from '../General/Error'
import Tabla from './Tabla'

class Usuarios extends Component {
  componentDidMount(){
    if(!this.props.usuarios.length){
        this.props.traerTodos();
    }
  }

  ponerContenido = () => {
      if (this.props.cargando) {
        return <Spinner/>
      }

      if (this.props.error){
        return <Error error={this.props.error}/>
      }

      return (
          <div>
              <h2>Usuarios</h2>
              <Tabla/>
          </div>
      );
  }

  render(){
    return this.ponerContenido()
  }
}

const mapStateToProps = (reducers) => {
    return reducers.usuariosReducer;
}
export default connect(mapStateToProps, usuariosActions)(Usuarios);