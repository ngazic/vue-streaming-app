<template>
<div id="signin">
  <div class="signin-form">
    <form @submit.prevent="onSubmit">
      <div class="input">
        <label for="user">User</label>
        <input type="user" id="user" v-model="user" />
      </div>
      <div class="input">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div class="submit">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  mapActions
} from "vuex";
export default Vue.extend({
  data() {
    return {
      user: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["login"]),
    onSubmit() {
      const data: {
        email: string;
        password: string;
      } = {
        email: this.user,
        password: this.password
      };
      this.login(data)
        .then(() => {
          if (this.$store.getters.isAuthenticated) {
            // eslint-disable-next-line no-console
            console.log("change route");
            this.$router.push("/");
          }
        })
        .catch(err => alert(err));
    }
  }
});
</script>

<style scoped>
.signin-form {
  max-width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}

.input {
  margin: 10px auto;
}

.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input input:focus {
  outline: none;
  border: 1px solid #521751;
  background-color: #eee;
}

.submit button {
  border: 1px solid #521751;
  color: #521751;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: #521751;
  color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}
</style>
