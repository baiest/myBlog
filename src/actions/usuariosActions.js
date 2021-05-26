import axios from 'axios';
import { USUARIO_TYPES } from '../types/usuariosTypes'

export const traerTodos = () => async(dispatch) => {
    dispatch({
        type: USUARIO_TYPES.cargando
    })
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        dispatch({
            type: USUARIO_TYPES.traer_todos,
            payload: response.data
        })
    } catch (error) {
        console.log('Error', error.message)
        dispatch({
            type: USUARIO_TYPES.error,
            payload: error.message
        })
    }
}