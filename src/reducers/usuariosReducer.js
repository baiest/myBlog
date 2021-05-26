import { USUARIO_TYPES } from '../types/usuariosTypes'

const INITIAL_STATE = {
    usuarios: [],
    cargando: false,
    error: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USUARIO_TYPES.traer_todos:
            return {...state, usuarios: action.payload, cargando: false }
        case USUARIO_TYPES.cargando:
            return {...state, cargando: true }
        case USUARIO_TYPES.error:
            return {...state, error: action.payload, cargando: false }
        default:
            return state
    }
}