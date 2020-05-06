import { todosRef } from '../config/firebase'
import { FETCH_TODOS } from './types'

// add new toDo to the list
export const addToDo = newToDo => async dispatch => {
  await todosRef.push().set(newToDo)
}

// remove todo to the list
export const completeToDo = completeToDoId => async dispatch => {
  await todosRef.child(completeToDoId).remove()
}

// i hear changes in the todo list
export const fetchToDos = () => async dispatch => {
  await todosRef.on("value", snapshot => {
    dispatch({
      type: FETCH_TODOS,
      payload: snapshot.val()
    })
  })
}