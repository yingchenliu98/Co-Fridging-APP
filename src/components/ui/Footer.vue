<template>
<div class="footer">
    <div class="row justify-content-center row-bottom">
        <div class="col-3 bottom-col">
          <p>Site Map</p>
          <p>
            <router-link class="bottom-text" to="/">Home</router-link>
          </p>
          <p>
            <router-link class="bottom-text" to="/">About</router-link>
          </p>
          <p>
            <router-link class="bottom-text" to="/">Community</router-link>
          </p>
          <p>
            <router-link class="bottom-text" to="/">Resources</router-link>
          </p>
        </div>
        <div class="col-3 bottom-col">
          <p>Other</p>
          <p>
            <router-link class="bottom-text" to="/">Press</router-link>
          </p>
          <p>
            <router-link class="bottom-text" to="/">Careers</router-link>
          </p>
          <p>
            <router-link class="bottom-text" to="/">Help Center</router-link>
          </p>
        </div>
        <div class="col-3 bottom-col">
          <p>Legal</p>
          <p>
            <router-link class="bottom-text" to="/">Terms and Conditions</router-link>
          </p>
          <p>
            <router-link class="bottom-text" to="/">Privacy Policy</router-link>
          </p>
          <p>
            <router-link class="bottom-text" to="/">Cookie Policy</router-link>
          </p>
          <p>
            <router-link class="bottom-text" to="/">Candidate Notice</router-link>
          </p>
        </div>
        <div class="col-3 bottom-col">
          <router-link class="logo-container" to="/">
            CoFRIDGE 1.0
          </router-link>
        </div>
    </div>
    <div class="row justify-content-center banner-bottom">
      <div class="col-3 banner-col">
         <p>Made with ❤️ in Cambridge, MA © 2021 CoFridge</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
.row-bottom{
  height: 30vh;
  padding: 5vh 20vw;
}
.bottom-col{
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color:#403D39;
}
.bottom-text{
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color:#403D39;
  text-decoration:none;
}
.logo-container{
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  text-decoration: none;
  color: #403D39;
  margin: 0 2.5vw 0 2.5vw;
  width: 20vw;
}
.banner-col{
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
}
.banner-bottom{
  height: 4vh;
  margin-top: 5vh;
}
.footer{
  height: 40vh;
  margin-top: 5vh;
}
</style>
