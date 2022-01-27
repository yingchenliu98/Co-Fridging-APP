<template>
  <div class="col-12 edit-profile-div">
    <div class="row justify-content-center row-three">
      <div class="col-6 title-div">
        <h2 class="title">Edit Profile</h2>
      </div>
      <div class="col-6 title-div title-left">
        <router-link class="router-link cancel-btn" to="/profile">Cancel</router-link>
      </div>
    </div>
    <div class="row justify-content-center row-four">
      <div class="col-3 left-div">
        <h2 class="subtitle">Profile Details</h2>
      </div>
      <div class="col-6 middle-div">
        <!-- <form id="sign-in" @submit.prevent="signIn" class="auth-form"> -->
        <form id="sign-in" @submit.prevent="" class="auth-form">
          <label class="form-label">Username*</label>
          <form class="form-input">
            <!-- <label for="username">Username</label> -->
            <input
              v-model="username"
              id="username"
              name="username"
              required
            />
          </form>
          <label class="form-label">Name</label>
          <form class="form-input">
            <!-- <label for="username">Username</label> -->
            <input
              v-model="name"
              id="name"
              name="name"
            />
          </form>
          <label class="form-label">Location</label>
          <form class="form-input">
            <!-- <label for="username">Username</label> -->
            <input
              v-model="location"
              id="location"
              name="location"
              placeholder = "City, Country"
              required
            />
          </form>
          <label class="form-label">Bio</label>
          <form class="form-input">
            <!-- <label for="password">Password</label> -->
            <textarea
              v-model="bio"
              id="bio"
              name="bio"
              placeholder = "Tell the community who you are"
            />
          </form>
        </form>
      </div>
      <div class="col-3 right-div"></div>
    </div>
    <div class="row justify-content-center row-five">
      <div class="col-6 submit-div"></div>
      <div class="col-6 submit-div submit-left">
        <!-- <router-link class="router-link cancel-btn cancel-btn-end" to="/profile">Cancel</router-link> -->
        <input type="submit" value="Save Changes" class="save-btn" @click="saveChanges" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';

export default {
  name: 'EditProfileForm', 
  props: ['signedInUser', 'userProfileOwner', 'response'],
  data() {
    return {
      username: '',
      name: '',
      location: '',
      bio: '',
    };
  },
  created(){
     this.getSignedInUser();
  },
  methods: {
    getSignedInUser(){
      axios
        .get('/api/user/session/profile')
        .then((response) => {
          this.username = response.data.username;
          this.name = response.data.name;
          this.location = response.data.location;
          this.bio = response.data.bio;
        })
        .catch((error) => eventBus.$emit('response-error', {data: error.response,})
        );
    },
    saveChanges(){
      axios
        .put('/api/user/profile', {
          username: this.username,
          name: this.name,
          location: this.location,
          bio: this.bio,
        })
        .then((response) => {
            eventBus.$emit('profile-updated'),{
              data: response.data,
              status: response.status,
            }
            this.$router.push('/profile').catch(()=>{});;
          }
        )
        .catch((error) => 
          eventBus.$emit('response-error',{
            data: error.response.data.error,
          })
        );
    }
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
  border-bottom: 1px solid black;
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
  border-top: 1px solid black;
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
