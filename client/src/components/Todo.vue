<template>
    <div class="card">
        <div class = "card-body">
            <div class = "card-title">Title: {{ todo.title }}</div>
            <div class = "card-text">Description: {{ todo.description }}</div>
            <div class>Created At: {{ todo.created }}</div>
            <div class>Completed: {{ todo.done }} </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Todo',
        props: [
            "todo"
        ]
    }
</script>
