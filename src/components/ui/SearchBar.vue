<template>
  <div class="search-bar-div">
    <input
      v-model="inputUsername"
      placeholder="Search a user..."
      type="search"
      name="search"
      required
    />
    <button @click="takeToProfile" class="search-btn">🔍</button>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';

export default {
  name: 'UserSearchBar', // Header
  components: {},
  data() {
    return {
      inputUsername: '',
      userProfileOwner: '',
      sessionUsername: '',
    };
  },
  created(){
    axios
      .get("/api/user/session/profile")
      .then((response) => {
        this.sessionUsername = response.data.username;
      })
      .catch((error) =>
        eventBus.$emit("response-error", { data: error.response })
      );
  },
  methods: {
    takeToProfile() {
      this.userProfileOwner = this.inputUsername;

      axios
        .get('/api/user/userID/' + this.inputUsername)
        .then((response) => {
          eventBus.$emit('view-user-profile', {
            data: response.data,
            status: response.status,
          });
          
          if(this.userProfileOwner == this.sessionUsername){
            this.$router.push('/profile').catch(()=>{});;
          }else{
            this.$router
              .push({
                name: 'userprofile',
                params: { userProfileOwner: this.userProfileOwner },
              })
              .catch(() => {});
          }
        })
        .catch((error) => {
          eventBus.$emit('response-error', {
            data: error.response.data.error,
          });
        });

      this.inputUsername = '';
    },
  },
};
</script>

<style scoped>
.search-bar-div{
  display: inline;
  margin: 0;
  padding:0;
}
.search-btn{
  padding: 0.5vh 0.5vw;
  background: none;
  border-radius: 5px;
  border: none;
  transition: 0.3s;
}
.search-btn:hover{
  background: #403D39;
}
input{
  border:none;
  border-bottom: 2px solid #403D39;
  padding: 0 0;
  background: none;
}
input:focus{
  outline: none;
}
</style>

