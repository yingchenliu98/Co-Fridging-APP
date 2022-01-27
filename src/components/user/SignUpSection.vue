<template>
  <div class="auth-form-container">
    <form id="sign-in" @submit.prevent="createUser" class="auth-form">
      <label class="form-label">Username</label>
      <div class="input-div">
        <input
          v-model="username"
          id="username"
          name="username"
          required
        />
      </div>
      <label class="form-label">Password</label>
      <div class="input-div">
        <input
          v-model="password"
          id="password"
          name="password"
          type="password"
          required
        />
      </div>
      <input type="submit" value="Sign Up" class="auth-btn" />
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';

export default {
  name: 'CreateUserForm', //SignUpPage
  components: {},
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {},
  methods: {
    createUser() {
      axios
        .post('/api/user/', {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          eventBus.$emit('login-success', {
            data: response.data,
            status: response.status,
          });
          this.$router.push('/home').catch(()=>{});;
        })
        .catch((error) =>
          eventBus.$emit('response-error', {
            data: error.response.data.error,
            // status: error.status,
          })
        );
      this.username = '';
      this.password = '';
    },
  },
};
</script>

<style scoped>
#username,
#password{
  width: 75%;
  height: 4vh;
  border: 2px solid #403D39;
  /* border-radius: 6px; */
}
.form-label{
  font-family: 'Montserrat', sans-serif;
}
.input-div{
  margin-bottom: 1vh;
  border-radius:0;
}
.auth-btn{
  font-family: 'Montserrat', sans-serif;
  margin: 1vh 0;
  padding: 0.8vh 1vw 0.8vh 1vw;
  border:none;
  border-radius: 6px;
  background: #cdff61;
  color: black;
  font-weight:500;
}

</style>
