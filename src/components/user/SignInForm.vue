<template>
  <div class="auth-form-container">
    <div class="row justify-content-center">
      <div class="col-5 form-col">
        <h2 class="title">Welcome back!</h2>
        <form id="sign-in" v-on:submit.prevent="signIn" class="auth-form">
          
          <label class="form-label">Username</label>
          <!-- <form class="form-input">
            <input v-model="username" id="username" name="username" required />
          </form> -->
          <input v-model="username" id="username" name="username" required />
         
          <label class="form-label">Password</label>
          <!-- <form class="form-input">
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              required
            />
          </form> -->
          <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              required
            />

          <input type="submit" value="Log In" class="auth-btn" />

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

export default {
  name: "SignIn", //SignInPage
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    signIn() {
      axios
        .post("/api/user/session/signin", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          eventBus.$emit("login-success", {
            data: response.data,
          });
          this.$router.push("/home").catch(()=>{});;
        })
        .catch((error) => {
          eventBus.$emit("response-error", {
            data: error.response.data.error,
          });
        });
      this.username = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
.auth-form-container {
  height: 64vh;
}
.title {
  font-family: "Montserrat", sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 3vh;
}
.form-col {
  padding: 12vh 10vw;
}
#username,
#password {
  width: 100%;
  height: 4vh;
  border: 2px solid #403d39;
  /* border-radius: 6px; */
}
.form-label {
  font-family: "Montserrat", sans-serif;
  margin-top: 1vh;
}
.form-input {
  margin-bottom: 2vh;
  border-radius: 0;
}
.note {
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  margin: 3vh 0 3vh 0;
  color: #f77a4a;
}
.auth-btn {
  font-family: "Montserrat", sans-serif;
  padding: 0.8vh 1vw 0.8vh 1vw;
  margin-top: 2vh;
  border: none;
  border-radius: 6px;
  background: #cdff61;
  color: black;
  font-weight: 500;
}
</style>
