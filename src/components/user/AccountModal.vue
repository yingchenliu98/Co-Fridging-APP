<template>
  <div class="edit-profile-modal">
    <div class="edit-div">
      <div>
        <span class="title">Username</span>
        <button
          v-if="userHasSelectedUsername"
          @click="changeUsername"
          class="change-btn"
        >Change</button>
      </div>
      <div class="info">
        Placeholder
      </div>
      <div v-if="userHasSelected">
        <ChangeUsernameForm v-if="isChangeUsername" />
      </div>

      <div>
        <span class="title">Password</span>
        <button
          v-if="userHasSelectedPassword"
          @click="changePassword"
          class="change-btn"
        >Change</button>
      </div>
      <div class="info-2">
        Placeholder
      </div>
      <div v-if="userHasSelected">
        <ChangePasswordForm v-if="isChangePassword" />
      </div>
    </div>

    <div class="delete-div">
      <button @click="deleteAccount" class="delete-btn">Delete Account</button>
      <div v-if="userHasSelected">
        <DeleteAccountForm v-if="isDeleteAccount" />
      </div>
    </div>

  </div>
</template>

<script>
import ChangeUsernameForm from '../user/ChangeUsernameForm.vue';
import ChangePasswordForm from '../user/ChangePasswordForm.vue';
import DeleteAccountForm from '../user/DeleteAccountForm.vue';

export default {
  name: 'EditProfileModal', // AboutMePage
  components: {
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm,
  },
  data() {
    return {
      isChangeUsername: false,
      isChangePassword: false,
      isSignOut: false,
      isDeleteAccount: false,
      userHasSelected: false,
      userHasSelectedUsername: true,
      userHasSelectedPassword: true,
    };
  },
  computed: {},
  methods: {
    changeUsername() {
      this.userHasSelected = true;
      this.isChangeUsername = true;
      this.isChangePassword = false;
      this.isSignOut = false;
      this.isDeleteAccount = false;
      this.userHasSelectedUsername = false;
      this.userHasSelectedPassword = true;
    },
    changePassword() {
      this.userHasSelected = true;
      this.isChangeUsername = false;
      this.isChangePassword = true;
      this.isSignOut = false;
      this.isDeleteAccount = false;
      this.userHasSelectedUsername = true;
      this.userHasSelectedPassword = false;
    },
    signOut() {
      this.userHasSelected = true;
      this.isChangeUsername = false;
      this.isChangePassword = false;
      this.isSignOut = true;
      this.isDeleteAccount = false;
      this.userHasSelectedUsername = true;
      this.userHasSelectedPassword = true;
    },
    deleteAccount() {
      this.userHasSelected = true;
      this.isChangeUsername = false;
      this.isChangePassword = false;
      this.isSignOut = false;
      this.isDeleteAccount = true;
      this.userHasSelectedUsername = true;
      this.userHasSelectedPassword = true;
    },
  },
};
</script>

<style scoped>
.title{
  font-family: 'Montserrat', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  padding: 0;
  margin: 0;
}
.change-btn{
  font-family: 'Montserrat', sans-serif;
  color: #F6652C;
  padding: 0.5vh 1vw 0.8vh 1vw;
  border-radius: 6px;
  border: none;
  background: none;
  font-size: 0.95rem;
}
.info{
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 3vh;
}
.info-2{
  font-family: 'Montserrat', sans-serif;
}
.edit-div{
  background:white;
  padding: 3vh 2vw;
  border: 1.5px solid black;
}
.delete-div{
  background:white;
  padding: 3vh 2vw;
  border: 1.5px solid black;
  margin-top:2vh;
}
.delete-btn{
  border:none;
  background: none;
  font-family: 'Montserrat', sans-serif;
  font-size:0.95rem;
  font-weight: 600;
}
</style>
