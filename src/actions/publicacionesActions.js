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

        response.data.map(publicacion => ({...publicacion,
            comentarios: [],
            abierto: false
        }));
        const publicaciones_actualizadas = [
            ...publicaciones,
            response.data
        ];

        dispatch({
            type: PUBLICACIONES_TYPES.actualizar,
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

export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
    const { publicaciones } = getState().publicacionesReducer;
    const seleccionada = publicaciones[pub_key][com_key];

    const actualizada = {
        ...seleccionada,
        abierto: !seleccionada.abierto
    };
    const publicaciones_actualizadas = [...publicaciones];
    publicaciones_actualizadas[pub_key] = [
        ...publicaciones[pub_key]
    ];

    publicaciones_actualizadas[pub_key][com_key] = actualizada;

    dispatch({
        type: PUBLICACIONES_TYPES.actualizar,
        payload: publicaciones_actualizadas
    })
}

export const traerComentarios = (pub_key, com_key) => async(dispatch, getState) => {
    const { publicaciones } = getState().publicacionesReducer;
    const seleccionada = publicaciones[pub_key][com_key];

    dispatch({
        type: PUBLICACIONES_TYPES.com_cargando
    })

    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`)
        const actualizada = {
            ...seleccionada,
            comentarios: response.data
        };

        const publicaciones_actualizadas = [...publicaciones];
        publicaciones_actualizadas[pub_key] = [
            ...publicaciones[pub_key]
        ];

        publicaciones_actualizadas[pub_key][com_key] = actualizada;
        dispatch({
            type: PUBLICACIONES_TYPES.com_actualizar,
            payload: publicaciones_actualizadas
        })
    } catch (error) {
        dispatch({
            type: PUBLICACIONES_TYPES.com_error,
            payload: `Error en los comentarios: ${error}`
        })
    }
}