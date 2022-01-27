<template>
  <div class="settings-div">
    <div class="row justify-content-center row-zero">
      <MainNav />
    </div>
    <div class="row justify-content-center row-one">
      <EditProfileForm 
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
import EditProfileForm from '../components/user/EditProfileForm.vue';
import MainNav from '../components/ui/MainNav.vue';

export default {
  name: 'ProfilePage',
  props: ['signedInUser', 'userProfileOwner', 'response'],
  components: {Footer, EditProfileForm, MainNav},
  beforeCreate(){
    let authenticated = this.$cookie.get('fritter-auth');
        if (!authenticated) {
        this.$router.push("/").catch(()=>{});;
        } else {
        this.$router.push("/edit-profile").catch(()=>{});;
        }
    },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.settings-div{
  height: auto;
  background-color: #F2F4FF;
}
.row-zero{
  height: 10vh;
}
.row-one{
  padding: 5vh 20vw;
}
.nav-header{
  background: rgba(242,244,255,0.9);
}
</style>
