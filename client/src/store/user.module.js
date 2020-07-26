import { userService } from '../services';
import router from '../router';

const user = JSON.parse(localStorage.getItem('user'));
const state = user ? { status: { loggedIn: true}, user} : { status: {}, user: null};

const actions = {
    login({ dispatch, commit}, {username, password}) {
        commit('loginRequest', {username});

        userService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/')
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true })
                }
            );

    },
    register({ dispatch, commit}, {username, email, password}) {
        commit('registerRequest', {username});

        userService.register(username, email, password)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/')
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true })
                }
            );

    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },    
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = {loggedIn: true};
        state.user = user;
    },
    loginFailure(state) {
        state.status = {}
        state.user = null;
    },
    registerRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    registerSuccess(state, user) {
        state.status = {loggedIn: true};
        state.user = user;
    },
    registerFailure(state) {
        state.status = {}
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    }
};

export const users = {
    namespaced: true,
    state,
    actions,
    mutations
}