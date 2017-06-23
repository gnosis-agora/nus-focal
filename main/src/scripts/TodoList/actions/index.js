/**
  Fires off actions to the reducers, informing the reducer of changes to be made
**/

// used to get unique id of a to-do item via its text composition
const getTextId = text => {
  let output = 0;
  for (let i=0;i<text.length;i++) {
    output += text.charCodeAt(i)*(i+1);
  }
  return output
}

export const addTodo = text => {
  return {
    type: 'ADD_TODO',
    payload: {
      text,
      id: getTextId(text)
    }
  }
}

export const deleteTodo = id => {
  return {
    type: 'DELETE_TODO',
    payload: {
      id
    }
  }
}

export const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    payload: {
      filter
    }
  }
}

export const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    payload: {
      id
    }
  }
}
