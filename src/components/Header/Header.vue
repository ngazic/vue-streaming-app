<template>
<header id="header">
  <div class="logo">
    <router-link to="/">Vue - Streaming App</router-link>
  </div>
  <nav>
    <ul>
      <li v-if="!auth">
        <router-link to="/signup" class="login">Sign Up</router-link>
      </li>
      <li v-if="!auth">
        <router-link to="/signin" class="login">Sign In</router-link>
      </li>
      <li v-if="auth">
        <button @click="onLogout" class="logout">Logout</button>
      </li>
    </ul>
  </nav>
</header>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    auth(): void {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
});
</script>

<style scoped>
#header {
  height: 56px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  background-color: #521751;
  padding: 0 20px;
}

.logo {
  font-weight: bold;
  color: white;
}

.logo a {
  text-decoration: none;
  color: white;
}

@media only screen and (max-width: 400px) {
  .logo a {
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 80px;
    overflow: hidden;
  }
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
}

li {
  margin: 0 16px;
}

li a {
  text-decoration: none;
  color: white;
}

li a:hover,
li a:active,
li a.router-link-active {
  color: #fa923f;
}

.logout {
  background-color: transparent;
  border: none;
  font: inherit;
  color: white;
  cursor: pointer;
}
</style>
