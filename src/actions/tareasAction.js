import axios from 'axios';
import { TAREAS_TYPES } from '../types/tareasTypes';

export const traerTodos = () => async(dispatch) => {
    dispatch({
        type: TAREAS_TYPES.cargando
    })

    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')

        const tareas = {}
        response.data.map(tar => {
            tareas[tar.userId] = {
                ...tareas[tar.userId],
                [tar.id]: {
                    ...tar
                }
            }
        })

        dispatch({
            type: TAREAS_TYPES.traer_todos,
            payload: tareas
        })
    } catch (error) {
        dispatch({
            type: TAREAS_TYPES.error,
            payload: error.message
        })
    }
}