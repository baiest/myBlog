import { TAREAS_TYPES } from '../types/tareasTypes'

const INITIAL_STATE = {
    tareas: [],
    cargando: false,
    error: '',
}

const tareasReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TAREAS_TYPES.traer_todos:
            return {...state, tareas: action.payload, cargando: false, error: '' }
        case TAREAS_TYPES.cargando:
            return {...state, cargando: true, error: '' }
        case TAREAS_TYPES.error:
            return {...state, cargando: false, error: action.payload }
        default:
            return state
    }
}

export default tareasReducer