import axios from 'axios';
import { PUBLICACIONES_TYPES } from '../types/publicacionesTypes'
import { USUARIO_TYPES } from '../types/usuariosTypes'

export const traerTodos = () => async(dispatch) => {
    dispatch({
        type: PUBLICACIONES_TYPES.cargando
    })
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        dispatch({
            type: PUBLICACIONES_TYPES.traer_todos,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: PUBLICACIONES_TYPES.error,
            payload: error.message
        })
    }
}

export const traerPorUsuario = (key) => async(dispatch, getState) => {
    const { usuarios } = getState().usuariosReducer;
    const { publicaciones } = getState().publicacionesReducer;
    const usuario_id = usuarios[key].id

    try {

        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)

        const publicaciones_actualizadas = [
            ...publicaciones,
            response.data
        ];

        dispatch({
            type: PUBLICACIONES_TYPES.traer_por_usuario,
            payload: publicaciones_actualizadas
        })

        const publicaciones_key = publicaciones_actualizadas.length - 1;
        const usuarios_actualizados = [...usuarios];
        usuarios_actualizados[key] = {
            ...usuarios[key],
            publicaciones_key
        }

        dispatch({
            type: USUARIO_TYPES.traer_todos,
            payload: usuarios_actualizados
        })

    } catch (error) {
        dispatch({
            type: PUBLICACIONES_TYPES.error,
            payload: error.message
        })
    }
}