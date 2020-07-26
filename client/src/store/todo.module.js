import { todoService } from '../services';

const state = {
    items: null
}

const actions = {
    getAll({ commit }) {
        commit('getAllTodosRequest');

        todoService.getAllTodos().then(
            todos => commit('getAllTodosSuccess', todos),
            error => commit('getAllTodosFailure', error)
        );
    },

    post({ dispatch, commit}, {title, descrption}) {
        commit('postTodoRequest');
        todoService.addTodo(title, descrption)
            .then(
                todo => {
                    commit('postTodoSuccess', todo)
                },
                error => {
                    commit('postTodoFailure', error);
                    dispatch('alert/error', error, {root: true})
                }
            );
    }
}

const mutations = {
    getAllTodosRequest(state) {
        state.status = { isLoading: true };
    },
    getAllTodosSuccess(state, todos) {
        console.log(todos)
        state.status = { isLoading: false};
        state.items = todos;
    },
    getAllTodosFailure(state, error) {
        state.status = { isLoading: false },
        state.error = error
    },
    postTodoRequest(state){
        state.status = { isLoading: true };
    },
    postTodoSuccess(state, todo){
        state.status = { isLoading: false };
        state.items = [ ...state.todos , todo ]
    },
    postTodoFailure(state, error){
        state.status = { isLoading: false };
        state.error = error
    }
}

export const todos = {
    namespaced: true,
    state,
    actions,
    mutations
}