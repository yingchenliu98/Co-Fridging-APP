<template>
  <div class="opening-div">
    <div class="row justify-content-center row-zero">
      <OpeningNav />
    </div>
    <Notification />
    <div class="row justify-content-center row-one">
      <!-- <div class="col-1 left-col"></div> -->
      <div class="col-7 image-col">
        <img src="../assets/fg-0-hh.png" class="image">
      </div>
      <div class="col-5 title-col">
        <h2 class="title">
          <span>Join the thousands in your neighborhood with CoFridge for free.</span>
          <br><br>
          <span class="title-strong">Share more, gain more.</span>
        </h2>
        <div class="signup-div">
          <SignUpSection />
        </div>
      </div>
      <!-- <div class="col-1 right-col"></div> -->
    </div>
    <div class="row justify-content-center row-two">
      <div class="col-3 hye-col">
        <h2 class="title-strong hye-text">Have you ever ... ?</h2>
      </div>
      <div class="col-3 hye-col">
        <div class="hye-div">
          <span class="main-text"><strong class="main-text-strong">thrown away groceries</strong> when you move?</span>
        </div>
      </div>
      <div class="col-3 hye-col">
        <div class="hye-div">
          <span class="main-text">found <strong class="main-text-strong">unfinished groceries</strong> in your fridge at the end of your grocery cycle? </span>
        </div>
      </div>
      <div class="col-3 hye-col">
        <div class="hye-div">
          <span class="main-text">felt <strong class="main-text-strong">unmotivated to finish</strong> something because you are ready to try something new?</span>
        </div>
      </div>
    </div>
    <div class="row justify-content-center row-three">
      <div class="col-3 dyk-col">
        <h2 class="title-strong dyk-title">Did you know ... ?</h2>
      </div>
       <div class="col-3 dyk-col">
        <div class="dyk-div dyk-number">
          33% - 50%
        </div>
        <div class="dyk-div dyk-text">
          food produced globally is never eaten.
        </div>
      </div>
       <div class="col-3 dyk-col">
        <div class="dyk-div dyk-number">
          1 Trillion
        </div>
        <div class="dyk-div dyk-text">
          dollars worth of food is wasted this way.
        </div>
      </div>
       <div class="col-3 dyk-col">
        <div class="dyk-div dyk-number">
          1.3%
        </div>
        <div class="dyk-div dyk-text">
          of total GDP in the USA is represented by this food waste.
        </div>
      </div>
    </div>
    <div class="row justify-content-center row-four">
      <div class="col-6 call-col">
        <h2 class="title-strong call-title">Join in on something big.</h2>
        <img src="../assets/grocery-1.png" class="image grocery-image">
        <!-- <router-link class="router-link join-btn" to="/signup">Join us</router-link> -->
      </div>  
      <div class="col-6 call-col">
        <h2 class="title call-title">A community movement for tackling the last mile of food waste by sharing grocery amongst each other.</h2>
      </div>  
    </div>
    <Footer />
  </div>
</template>

<script>
import SignUpSection from '../components/user/SignUpSection.vue';
import Footer from '../components/ui/Footer.vue';
import Notification from '../components/ui/Notification.vue';
import OpeningNav from '../components/ui/OpeningNav.vue';

export default {
  name: 'OpeningPage',
  props: ['signedInUser', 'response'],
  components: {SignUpSection, Footer, Notification,OpeningNav},
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.opening-div{
  height: auto;
  padding:0;
  margin:0;
  background-color:#FCF8F2;
  overflow-x: hidden;
  overflow-y: hidden;
}
.row-zero{
  height: 10vh;
}
.row-one{
  height: 70vh;
  margin: 0 100px;
}
.row-two{
  height: 30vh;
  background-color:#FFF0DC;
  padding: 8vh 8vw;
  /* border: 1px solid black; */
}
.row-three{
  height: 32vh;
  /* background-color:#F6652C; */
  background-color: #403D39;
  padding: 8vh 8vw;
}
.row-four{
  height: 80vh;
  /* background-color:#F6652C; */
  /* background-color: #F77A4A; */
  background-color: #FFF0DC;
  padding: 8vh 20vw;
}
.image-col{
  height: 100%;
  padding: 6vh 3vw 6vh 3vw;
}
.image{
  max-width:100%;
}
.title-col{
  padding: 10vh 5vw 10vh 5vw;
}
.title{
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  font-weight: 400;
}
.title-strong{
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}
.signup-div{
  margin: 4vh 0;
}
.main-text{
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  color:#403D39;
}
.hye-col,
.dyk-col{
  padding: 0 1vw;
}
.hye-div{
  width: 100%;
  height: 20vh;
  /* border: 1px solid #403D39; */
  /* background-color:#F2F4FF; */
  margin: 0 1vw 0 1vw;
  padding: 0 2vw;
}
.main-text-strong{
  text-decoration: solid underline overline #cdff61 10px;
}
.dyk-div{
  width: 100%;
  margin: 0 1vw 0 1vw;
  padding: 0 2vw;
  text-align:left;
}
.dyk-title{
  color:white;
  padding-top: 2vh;
}
.dyk-number{
  font-family: 'Montserrat', sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  color:#cdff61;
}
.dyk-text{
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 300;
  color:white;
}
.call-title{
  color:#403D39;
  padding-top: 2vh;
  font-size:3.5rem;
}
.call-col{
  padding: 0 4vw 0 4vw;
}
.join-btn{
  font-family: 'Montserrat', sans-serif;
  padding: 0.8vh 1vw 0.8vh 1vw;
  border:none;
  border-radius: 6px;
  background: white;
  color: black;
  font-weight:500;
}
.grocery-image{
  padding: 2vh;
}
</style>
