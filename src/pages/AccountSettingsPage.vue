<template>
  <div class="settings-div">
    <div class="row justify-content-center row-zero">
      <MainNav />
    </div>
    <div class="row justify-content-center row-one">
      <AccountSettingsForm 
        :signedInUser="signedInUser"
        :userProfileOwner="userProfileOwner"
        :response="response"
      />
    </div>
    <Footer />
  </div>
</template>

<script>
// import SignOutForm from '../components/user/SignoutForm.vue';
// import EditProfile from '../components/user/EditProfileModal.vue';
import Footer from '../components/ui/Footer.vue';
import AccountSettingsForm from '../components/user/AccountSettingsForm.vue';
import MainNav from '../components/ui/MainNav.vue';

export default {
  name: 'ProfilePage',
  props: ['signedInUser', 'userProfileOwner', 'response'],
  components: {Footer, AccountSettingsForm, MainNav},
  beforeCreate(){
    let authenticated = this.$cookie.get('fritter-auth');
        if (!authenticated) {
        this.$router.push("/").catch(()=>{});;
        } else {
        this.$router.push("/account").catch(()=>{});;
        }
    },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.row-zero{
  height: 10vh;
}
.settings-div{
  height: auto;
  background-color: #F2F4FF;
}
.row-zero{
  height: 8vh;
}
.row-one{
  padding: 5vh 20vw;
}
</style>
