<template>
  <div class="edit-profile-div">
    <div class="row justify-content-center row-three">
      <div class="col-6 title-div">
        <h2 class="title">Account Settings</h2>
      </div>
      <div class="col-6 title-div title-left">
        <router-link class="router-link cancel-btn" to="/profile">Cancel</router-link>
      </div>
    </div>
    <div class="row justify-content-center row-four">
      <div class="col-3 left-div">
        <!-- <h2 class="subtitle">Account Details</h2> -->
      </div>
      <div class="col-9 middle-div">
        <AccountModal />
      </div>
      <!-- <div class="col-3 right-div"></div> -->
    </div>
    <div class="row justify-content-center row-five">
      <div class="col-6 submit-div"></div>
      <div class="col-6 submit-div submit-left">
        <!-- <router-link class="router-link cancel-btn cancel-btn-end" to="/profile">Cancel</router-link> -->
        <!-- <input type="submit" value="Save Changes" class="save-btn" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';
import AccountModal from './AccountModal.vue';

export default {
  name: 'EditProfileForm', 
  props: ['signedInUser', 'userProfileOwner', 'response'],
  components: {AccountModal},
  data() {
    return {
      username: this.userProfileOwner,
      password: '',
      location: '',
      bio: '',
    };
  },
  methods: {
    signIn() {
      axios
        .post('/api/user/session', {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          eventBus.$emit('login-success', {
            data: response.data,
          });
          this.$router.push('/home').catch(()=>{});;
        })
        .catch((error) => {
          eventBus.$emit('response-error', {
            data: error.response.data.error,
          });
        });
      this.username = '';
      this.password = '';
    },
  },
};
</script>

<style scoped>
.edit-profile-div{
  height: auto;
  padding: 0;
}
.row-three{
  width: 100%;
  padding: 0 0 4vh 0;
  margin:0;
  /* border-bottom: 1px solid black; */
}
.row-four{
  width: 100%;
  /* padding: 0 2vw 0 2vw; */
}
.title{
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  padding: 0;
  margin: 0;
}
.title-div,
.submit-div{
  padding:0;
}
.title-left,
.submit-left{
  text-align: right;
  align-self: flex-end;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}
.cancel-btn{
  color: #F6652C;
  padding: 0.8vh 1vw 0.8vh 1vw;
  border-radius: 6px;
}
.cancel-btn:hover{
  background-color: rgba(201,210,255, 0.5);
}
.subtitle{
  font-family: 'Montserrat', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  padding: 0;
  margin: 0;
}
.left-div,
.middle-div{
  padding: 0;
  margin-top: 4vh;
  margin-bottom: 4vh;
}
#username,
#location,
#name{
  width: 100%;
  height: 4vh;
  border: 2px solid #403D39;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  /* border-radius: 6px; */
}
#bio{
  width: 100%;
  height: 12vh;
  border: 2px solid #403D39;
  text-align: start;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  /* border-radius: 6px; */
}
.form-label{
  font-family: 'Montserrat', sans-serif;
}
.form-input{
  margin-bottom: 2vh;
  border-radius:0;
}
.row-five{
  width: 100%;
  padding: 4vh 0 0 0;
}
.save-btn{
  font-family: 'Montserrat', sans-serif;
  font-weight:500;
  background: #cdff61;
  color: black;
  padding: 0.8vh 1vw 0.8vh 1vw;
  border-radius: 6px;
  border: none;
}
.save-btn:hover{
  background-color: rgba(201,210,255, 0.5);
}
.cancel-btn-end{
  margin: 0 2vw 0 2vw;
}
</style>
