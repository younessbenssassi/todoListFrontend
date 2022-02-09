import Vue from 'vue'

const state = {
    todos:[]
};

// getters
const getters = {
    get_stored_todos(state) {
        return state.todos;
    }

};

// actions
const actions = {
    set_todos ({commit}, todos) {
        commit('set_todos', todos);
    }
}

// mutations
const mutations = {
    set_todos (state, todos) {
        Vue.set(state, 'todos', todos)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
