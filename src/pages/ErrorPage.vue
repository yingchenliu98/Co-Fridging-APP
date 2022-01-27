<template>
  <div class="error-div">
    <div class="row justify-content-center row-zero">
      <MainNav />
    </div>
    <div class="row justify-content-center row-one">
      <div class="col-7 error-image">
        <img src="../assets/404.png" class="image">
      </div>
      <div class="col-5 error-content">
        <h1>Oops! <br> Seems like you are lost...</h1>
        <h2 class="link">
          <router-link class="router-link link-btn" to="/home" v-if="signedInUser">Go back home</router-link>
          <router-link class="router-link link-btn" to="/" v-if="!signedInUser">Go back home</router-link>
        </h2>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '../components/ui/Footer.vue';
import MainNav from '../components/ui/MainNav.vue';

export default {
  name: 'ErrorPage',
  props: ['signedInUser'],
  components: {Footer, MainNav},
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
.row-zero{
  height: 10vh;
}
.row-one{
  height: 92vh;
}
.error-div{
  height: auto;
  padding:0;
  margin:0;
  background-color:#FCF8F2;
}
.error-content{
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 400;
  padding: 30vh 4vw 30vh 2vw;
  text-align: left;
}
.error-image{
  padding: 5vh 4vw;
}
.image{
  width: 100%;
}
.link{
  margin-top: 4vh;
}
.link-btn{
  padding: 0.8vh 1.2vw 0.8vh 1.2vw;
  border-radius: 6px;
  background: #cdff61;
  color: black;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
}
</style>
