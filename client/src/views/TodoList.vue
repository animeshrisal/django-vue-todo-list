<template>
    <ul v-if = "todos.items != null">
        <li class = "list-item" v-bind:key="todo.id" v-for="todo in todos.items">
            <Todo v-bind:todo="todo" />
        </li>
    </ul>
    <ul v-else>
        Loading....
    </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Todo from '../components/Todo'

export default {
    computed: {
        ...mapState({
            todos: state => state.todos
        })
    },
    components: {
        Todo
    },
    created () {
        this.getAllItems();
    },
    methods: {
        ...mapActions('todos', {
            getAllItems: 'getAll',
            postItem: 'post'
        }),
    }
};
</script>
<style lang="scss">
    .list-item{
        margin: 10px;
    }
</style>