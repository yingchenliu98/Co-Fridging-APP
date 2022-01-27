<template>
  <div class="auth-grid-container">
    <Notification />
    <div class="row justify-content-center row-zero">
      <OpeningNav />
    </div>

    <main class="main">
      <SignUpForm />
    </main>

    <hr>
    <Footer class="footer" />
  </div>
</template>

<script>
import Footer from '../components/ui/Footer.vue';
import SignUpForm from '../components/user/SignUpForm.vue';
import Notification from '../components/ui/Notification.vue';
import OpeningNav from '../components/ui/OpeningNav.vue';

export default {
  name: 'SignUpPage',
  components: {Footer,SignUpForm, Notification, OpeningNav},
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
