<template>
  <div>
    <!-- <div v-if="signedInUser" class="header-container">
      <MainNav />
    </div> -->
    <router-view
      :key="$route.path"
      :signedInUser="signedInUser"
      
      :userProfileOwner="userProfileOwner"
      :response="response"
    >
    </router-view>
  </div>
</template>

<script>
import { eventBus } from './main';
import axios from 'axios';
// import Notification from './components/ui/Notification.vue';

export default {
  name: 'app',
  components: {},
  data() {
    return {
      signedInUser: '',
      userProfileOwner: '',
      response: '',
    };
  },
  beforeCreate(){
    let authenticated = this.$cookie.get('fritter-auth');
    if (!authenticated) {
      this.$router.push("/");
    } else{
      this.$router.push("/home");
    }
  },
  // methods: {
  //   timeOut() {
  //     setTimeout(() => this.isNotificationVisible.value = false, 3000)
  //   }
  // },
  // beforeCreate: function() {
  //   let authenticated = this.$cookie.get('fritter-auth');
  //   if (!authenticated) {
  //     this.$router.push("/");
  //   }
  // },
  created() {
    axios
      .get('/api/user/session')
      .then(() => {
        let authenticated = this.$cookie.get('fritter-auth');
        if (authenticated) {
          this.signedInUser = authenticated;          
        }else{
          this.$router.push("/");
        }
      })
      .catch(() => {
        this.$cookie.set('fritter-auth', '');
      });

    eventBus.$on('login-success', (data) => {
      this.$cookie.set('fritter-auth', data.data.userID);
      this.signedInUser = data.data.userID;
    });
    eventBus.$on('signout-success', () => {
      this.$cookie.set('fritter-auth', '');
      this.$cookie.set('fritter-auth', '');
      this.signedInUser = '';
    });
  },
  updated() {
    eventBus.$on('login-success', (data) => {
      this.$cookie.set('fritter-auth', data.data.userID);
      this.signedInUser = data.data.userID;
    });
    eventBus.$on('signout-success', () => {
      this.$cookie.set('fritter-auth', '');
      this.signedInUser = '';
    });
    eventBus.$on('deleteAccount-success', () => {
      this.$cookie.set('fritter-auth', '');
      this.signedInUser = '';
    });
  },
};
</script>

<style scoped>
</style>
