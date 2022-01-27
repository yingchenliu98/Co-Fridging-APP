<template>
  <div class="profile-div">
    <!-- <Notification /> -->
    <div class="row justify-content-center row-zero">
      <MainNav />
    </div>
    <div class="row justify-content-center row-one">
      <div class="col-4 card-col">
        <UserProfileCard 
          :signedInUser="signedInUser"
          :response="response"
        />
      </div>
      <div class="col-8 card-col">
        <div class="row justify-content-center row-right">
           <div class="col-12">
            <UserStatsCard 
              :signedInUser="signedInUser"
              :response="response"
            />
           </div>
        </div>
      </div>
    </div>

    <hr>
    <Footer />
  </div>
</template>

<script>
//import axios from 'axios';
//import { eventBus } from '../main';

import Footer from '../components/ui/Footer.vue';
import MainNav from '../components/ui/MainNav.vue';
import UserProfileCard from '../components/user/UserProfileCard.vue';
import UserStatsCard from '../components/user/UserStatsCard.vue';
//import Notification from '../components/ui/Notification.vue';

export default {
  name: 'userprofile',
  props: ['signedInUser', 'response'],
  components: {Footer,MainNav, UserProfileCard, UserStatsCard},
  data() {
    return {
    };
  },
  created() {
    if(!this.signedInUser){
        this.$router.push("/");
    };
  },
};
</script>

<style scoped>
hr{
  border: 0;
  height: 0.5px;
}
.profile-div{
  height:auto;
  background-color: #FCF8F2;
  overflow-x: hidden;
  overflow-y: hidden;
}
.row-zero{
  width:100%;
  height: 9vh;
}
.row-one{
  padding: 4vh 20vw 10vh 20vw;
}
.row-two{
  height: auto;
  padding: 2vh 20vw 4vh 20vw;
}
.row-three{
  height: auto;
  padding: 2vh 20vw 8vh 20vw;
}
.card-col{
  padding-left: 18px;
  padding-right: 18px;
}
</style>
