<template>
  <div class="delete-user">
    <p>Are you sure you want to delete your account?</p>
    <p>You cannot get it back!</p>
    <button @click="deleteAccount" class="btn">Confirm</button><br /><br />
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';

export default {
  name: 'DeleteAccount', //UserProfileModal
  components: {},
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {},
  methods: {
    deleteAccount() {
      axios
        .delete('/api/user')
        .then((response) => {
          eventBus.$emit('response-change', {
            data: response.data,
          });
          eventBus.$emit('deleteAccount-success');
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
.delete-user {
  margin: 20px auto;
  padding: 20px;
  border: 5px solid #ccc;
  border-radius: 15px;
}
</style>
