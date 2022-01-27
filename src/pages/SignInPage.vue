<template>
  <div class="auth-grid-container">
    <div class="row justify-content-center row-zero">
      <OpeningNav />
    </div>
    <Notification/>
  
    <main class="main">
      <SignInForm />
    </main>

    <hr>
    <Footer class="footer" />
  </div>
</template>

<script>
import Footer from '../components/ui/Footer.vue';
import SignInForm from '../components/user/SignInForm.vue';
import Notification from '../components/ui/Notification.vue';
import OpeningNav from '../components/ui/OpeningNav.vue';

export default {
  name: 'SignInPage',
  components: {Footer, SignInForm, Notification,OpeningNav},
  // data() {
  //   return {
  //     isNotificationVisible: false,
  //   };
  // },
  // created(){
  //   eventBus.$on('get-notification', (data) => {
  //     this.isNotificationVisible = data.data;
  //     this.timeOut();
  //   });
  // },
  // methods: {
  //   timeOut() {
  //     setTimeout(() => this.isNotificationVisible.value = false, 3000)
  //   }
  // },
};
</script>

<style scoped>
.auth-grid-container{
  height: auto;
  background-color:#FCF8F2;
}
.row-zero{
  height: 10vh;
}
hr{
  color: black;
}
</style>
