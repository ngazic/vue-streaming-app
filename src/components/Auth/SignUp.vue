<template>
<div id="signup">
  <div class="signup-form">
    <form @submit.prevent="onSubmit">
      <div class="input">
        <label for="email">Mail</label>
        <input type="email" id="email" v-model="email" />
      </div>

      <div class="input">
        <label for="user">Username</label>
        <input type="text" id="user" v-model="user" />
      </div>

      <div class="input">
        <label for="password">Password</label>
        <input type="password" id="password" ref="passwrd" v-model="password" />
      </div>
      <div class="input">
        <label for="confirm-password">Confirm Password</label>
        <input type="password" ref="confirm-password" id="confirm-password" v-model="confirmPassword" />
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
      password: "",
      email: "",
      confirmPassword: ""
    };
  },
  methods: {
    ...mapActions(["signup"]),
    onSubmit(): void {
      if (this.password.length < 6) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        //@ts-ignore
        this.$refs.passwrd.focus();
        alert("Enter 6 characters minimum!!!");
        return;
      }
      if (this.confirmPassword !== this.password) {
        alert("Please confirm correct password!!!");
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        //@ts-ignore
        this.$refs["confirm-password"].focus();
        return;
      }
      // alert(JSON.stringify(this.data));

      this.signup({
          user: this.user,
          password: this.password,
          email: this.email
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => alert(err));
    }
  }
});
</script>

<style scoped>
.signup-form {
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

.input.inline label {
  display: inline;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input.inline input {
  width: auto;
}

.input input:focus {
  outline: none;
  border: 1px solid #521751;
  background-color: #eee;
}

.input select {
  border: 1px solid #ccc;
  font: inherit;
}

.hobbies button {
  border: 1px solid #521751;
  background: #521751;
  color: white;
  padding: 6px;
  font: inherit;
  cursor: pointer;
}

.hobbies button:hover,
.hobbies button:active {
  background-color: #8d4288;
}

.hobbies input {
  width: 90%;
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
