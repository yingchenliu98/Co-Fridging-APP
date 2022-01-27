<template>
  <div>
    <button @click="takeToProfile" class="btn btn-username">
      {{ username }}
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';

export default {
  name: 'UsernameRouter',
  props: ['userID'],
  data() {
    return { username: '' };
  },
  created() {
    this.updateUsername();
    eventBus.$on('username-updated', () => {
      this.updateUsername();
    });
  },
  methods: {
    updateUsername() {
      axios
        .get('/api/user/' + this.userID)
        .then((response) => {
          this.username = response.data;
        })
        .catch((error) =>
          eventBus.$emit('response-error', {
            data: error.response.data.error,
          })
        );
    },

    takeToProfile() {
      eventBus.$emit('viewUser-changed', {
        data: { userProfileOwner: this.userID },
      });
      this.$router
        .push({
          name: 'userprofile',
          params: { userProfileOwner: this.username },
        })
        .catch(() => {});
    },
    // Emit "viewUser-changed" when clicked and reroute to userProfile Page
  },
};
</script>

<style  scoped></style>
