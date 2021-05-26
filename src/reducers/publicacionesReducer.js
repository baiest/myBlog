import { PUBLICACIONES_TYPES } from '../types/publicacionesTypes'

const INITIAL_STATE = {
    publicaciones: [],
    cargando: false,
    error: ''
}

const publicacionesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PUBLICACIONES_TYPES.traer_todos:
            return {...state, publicaciones: action.payload, cargando: false, error: '' }
        case PUBLICACIONES_TYPES.traer_por_usuario:
            return {...state, publicaciones: action.payload, cargando: false, error: '' }
        case PUBLICACIONES_TYPES.cargando:
            return {...state, cargando: true, error: '' }
        case PUBLICACIONES_TYPES.error:
            return {...state, cargando: false, error: action.payload }
        default:
            return state
    }
}

export default publicacionesReducer