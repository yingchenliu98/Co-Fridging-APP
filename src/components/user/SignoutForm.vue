<template>
  <div>
    <button @click="signOut" class="btn-sign-out">Log out</button>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';

export default {
  name: 'SignOut', //AboutMePage
  methods: {
    signOut() {
      axios
        .delete('/api/user/session')
        .then((response) => {
          eventBus.$emit('response-change', {
            data: response.data,
          });
          eventBus.$emit('signout-success');
          this.$router.push('/').catch(()=>{});
        })
        .catch((error) => {
          eventBus.$emit('response-error', {
            data: error.response.data.error,
          });
        });
    },
  },
};
</script>

<style scoped>
.btn-sign-out{
  padding: 0.5vh 0.7vw 0.5vh 0.7vw;
  border: none;
  border-radius: 20px;
  background: white;
  color: black;
  font-weight:500;
}

</style>
