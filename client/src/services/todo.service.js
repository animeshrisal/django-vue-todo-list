import { authHeader } from '../helpers';

export const todoService = {
    getAllTodos,
    addTodo
}

function getAllTodos(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    return fetch(`http://localhost:8000/api/tasks`,  requestOptions)
        .then(handleResponse)
}

function addTodo(){
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    }
    return fetch(`http://localhost:8000/api/tasks`,  requestOptions)
    .then(handleResponse)
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}