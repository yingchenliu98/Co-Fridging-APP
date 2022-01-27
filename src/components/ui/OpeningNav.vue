<template>
  <div class="nav-header">
    <router-link class="logo-container" to="/">
      CoFRIDGE
    </router-link>
    <nav class="nav-container">
      <ul class="tab-list">
        <li>
            <router-link to="/404" class="router-link">About</router-link>
        </li>
        <li>
            <router-link to="/404" class="router-link">Community</router-link>
        </li>
         <li>
            <router-link to="/404" class="router-link">Resources</router-link>
        </li>
        <!-- <li>
            <router-link to="/signup" class="router-link" id="sign-up">Sign Up</router-link>
        </li> -->
        <li>
            <router-link to="/signin" class="router-link" id="log-in" v-if="!$route.meta.signupNavigation">Log In</router-link>
            <router-link to="/signup" class="router-link" id="log-in" v-else>Sign Up</router-link>
        </li>
        <!-- <li>
            <SearchBar />
        </li> -->
      </ul>
    </nav>
  </div>
</template>

<script>
//import SearchBar from './SearchBar.vue';

export default {
  name: 'Header',
  props: ['userProfileOwner'],
  components: {},
  data() {
    return {
      routeName: this.$route.name,
    };
  },
  methods:{
    isRoute(){
      return this.$route.name === "signin";
    }
  }
};
</script>

<style scoped>
.logo-container{
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
  color: #403D39;
  margin: 0 2.5vw 0 2.5vw;
  width: 20vw;
}
.nav-header{
  background-color: #FCF8F2;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 10vh;
  display: flex;
  align-items: center;
}
.nav-header *{
  display: inline;
}
.nav-header li{
   margin: 20px;
}
.nav-header li .router-link{
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
  color: #403D39;
  text-decoration: none;
}
.nav-container{
  display:flex;
  justify-content: right;
  margin: 0 2.5vw 0 2.5vw;
  width: 80vw;
}
#log-in{
  padding: 0.8vh 1vw 0.8vh 1vw;
  border-radius: 6px;
  background: #9EAAFF;
  background: #cdff61;
  color: black;
  font-weight:500;
}
#sign-up{
  font-weight:700;
}
.tab-list{
  padding: 0;
  margin:0;
}
</style>
