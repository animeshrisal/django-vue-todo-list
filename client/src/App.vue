<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <template v-if= "account.user == null">
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link>
      </template>
      <template v-else>
        <router-link to="/list">List</router-link>
        <router-link to="/login">Logout</router-link>
      </template>
    </div>
    <router-view/>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      account: state => state.users
    })
  },
}
</script>

