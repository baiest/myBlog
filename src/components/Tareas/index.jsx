import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as tareasActions from '../../actions/tareasAction'
import Spinner from '../General/Spinner'
import Error from '../General/Error'
class Tareas extends React.Component{
    componentDidMount(){
        this.props.traerTodos()
    }

    mostrarContenido = () => {
        const { tareas, cargando, error} = this.props

        if(cargando) return <Spinner/>
        if(error) return <Error error={error}/>
        return Object.keys(tareas).map(usu_id => (
            <div key={usu_id}>
                <h2>Usuario: {usu_id}</h2>
                <div className='contenedor_tareas'>
                    { this.ponerTareas(usu_id) }
                </div>
            </div>
        ));

    }
    
    ponerTareas = (usu_id) => {
        const { tareas } = this.props;
        const por_usuario = {
            ...tareas[usu_id]
        }

        return Object.keys(por_usuario).map(tar_id => (
            <div key={tar_id}>
                <input id='task_completed' type='checkbox' defaultChecked={por_usuario[tar_id].completed} />
                <label htmlFor="task_completed">{por_usuario[tar_id].title}</label>
            </div>
        ))
    }

    render(){
        return(
            <div>
                <button>
                    <Link to='/tareas/guardar'>Agregar</Link> 
                </button>
                { this.mostrarContenido() }
            </div>
        );
    }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer

export default connect(mapStateToProps, tareasActions)(Tareas);