<template>
  <div>
    <form v-on:submit.prevent="changeUsername">
      <div>
        <!-- <label for="username">Username:</label> -->
        <input
          v-model="username"
          id="edit-profile-field"
          name="username"
          placeholder="New Username"
          required
        />
      </div>
      <button type="submit" value="Confirm" class="btn btn-edit-profile">
        Confirm username change
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';

export default {
  name: 'ChangeUsernameForm', //UserProfileModal
  components: {},
  data() {
    return {
      username: '',
    };
  },
  computed: {},
  methods: {
    changeUsername() {
      axios
        .put('/api/user/username', {
          username: this.username,
        })
        .then((response) =>
          eventBus.$emit('username-updated', {
            data: response.data,
            status: response.status,
          })
        )
        .catch((error) =>
          eventBus.$emit('response-error', {
            data: error.response.data.error,
            // status: error.status,
          })
        );
      this.username = '';
    },
  },
};
</script>

<style scoped>
#edit-profile-field {
  width: 100%;
  height: 3vh;
}
</style>
