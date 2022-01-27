<template>
  <div>
    <form @submit.prevent="changePassword">
      <div>
        <!-- <label for="password">Password:</label> -->
        <input
          v-model="password"
          id="edit-profile-field"
          name="password"
          type="password"
          placeholder="New Password"
          required
        />
      </div>
      <button type="submit" value="Confirm" class="btn btn-edit-profile">
        Confirm password change
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';

export default {
  name: 'ChangePasswordForm', //UserProfileModal
  components: {},
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {},
  methods: {
    changePassword() {
      axios
        .put('/api/user/password', {
          password: this.password,
        })
        .then((response) =>
          eventBus.$emit('response-change', {
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
      this.password = '';
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
