<template>
  <div class="auth-form-container">
    <div class="row justify-content-center">
      <div class="col-5 form-col">
        <h2 class="title">Glad to see you here 💕</h2>
        <form id="sign-in" @submit.prevent="createUser" class="auth-form">
          <label class="form-label">Username</label>
           <input
              v-model="username"
              id="username"
              name="username"
              required
            />
          <label class="form-label">Password</label>
          <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              required
            />
          <input type="submit" value="Sign Up" class="auth-btn" />
        </form>
      </div>
    </div>
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
          this.$router.push('/home');
        })
        .catch((response) =>{
          console.log(response);
          // eventBus.$emit('response-error', {
          //   data: error,
          // })
        });
      this.username = '';
      this.password = '';
    },
  },
};
</script>

<style scoped>
.auth-form-container{
  height:64vh;
}
.title{
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 3vh;
}
.form-col{
  padding: 12vh 10vw;
}
#username,
#password{
  width: 100%;
  height: 4vh;
  border: 2px solid #403D39;
  /* border-radius: 6px; */
}
.form-label{
  font-family: 'Montserrat', sans-serif;
  margin-top: 1vh;
}
.form-input{
  margin-bottom: 2vh;
  border-radius:0;
}
.note{
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  margin: 3vh 0 3vh 0;
  color:#F77A4A;
}
.auth-btn{
  font-family: 'Montserrat', sans-serif;
  padding: 0.8vh 1vw 0.8vh 1vw;
  border:none;
  border-radius: 6px;
  background: #cdff61;
  color: black;
  font-weight:500;
  margin-top:2vh;
}
</style>
