<template>
  <section class="lost-guide-container">
    <p>You are not signed in yet!</p>
    <p>
      Click
      <router-link class="router-link btn btn-text" to="/signin"
        >here</router-link
      >
      to get back to sign in.
    </p>
  </section>
</template>

<script>
export default {
  name: 'LostGuide',
};
</script>

<style scoped></style>

