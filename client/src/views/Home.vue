<template>
  <div class="home">
    <template v-if= "account.user">
      <ul>
        <li>a</li>
      </ul>
    </template>
    <template v-else>
      Please login or register to add to your list
    </template>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Home',

  computed: {
    ...mapState({
      account: state => state.users
    })
  },
}
</script>
