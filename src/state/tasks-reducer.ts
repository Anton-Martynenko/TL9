import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';

export type removeTaskActionType = ReturnType<typeof removeTaskAC>
export type addTaskActionType = ReturnType<typeof addTaskAC>
export type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = removeTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        case 'ADD-TASK':
            return {...state, [action.todolistId]:
                    [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]};
        case "CHANGE-TASK-STATUS":
            return {...state, [action.todolistId]:
                    state[action.todolistId].map(t => t.id === action.taskId
                        ? {...t, isDone: action.isDone} : t)};
        case "CHANGE-TASK-TITLE":
            return {...state, [action.todolistId]:
                    state[action.todolistId].map(t => t.id === action.taskId
                        ? {...t, title: action.newTitle} : t)};
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return { type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return { type: 'ADD-TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId} as const
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => {
    return { type: 'CHANGE-TASK-TITLE', taskId, newTitle, todolistId} as const
}

