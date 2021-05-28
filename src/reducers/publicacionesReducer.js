import { PUBLICACIONES_TYPES } from '../types/publicacionesTypes'

const INITIAL_STATE = {
    publicaciones: [],
    cargando: false,
    error: '',
    com_cargando: false,
    com_error: ''
}

const publicacionesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PUBLICACIONES_TYPES.traer_todos:
            return {...state, publicaciones: action.payload, cargando: false, error: '' }
        case PUBLICACIONES_TYPES.actualizar:
            return {...state, publicaciones: action.payload, cargando: false, error: '' }
        case PUBLICACIONES_TYPES.cargando:
            return {...state, cargando: true, error: '' }
        case PUBLICACIONES_TYPES.error:
            return {...state, cargando: false, error: action.payload }
        case PUBLICACIONES_TYPES.com_actualizar:
            return {...state, publicaciones: action.payload, com_cargando: false, com_error: '' }
        case PUBLICACIONES_TYPES.com_cargando:
            return {...state, com_cargando: true }
        case PUBLICACIONES_TYPES.com_error:
            return {...state, com_cargando: false, error: '', com_error: action.payload }
        default:
            return state
    }
}

export default publicacionesReducer