<template>
  <section class="page-title-container">
    <h2>👋🏼 <UsernameRouter :userID="signedInUser" />{{ greetMsg }}</h2>
  </section>
</template>

<script>
import UsernameRouter from '../user/UsernameRouter.vue';
export default {
  name: 'PageTitle',
  props: ['signedInUser', 'greetMsg'],
  components: { UsernameRouter },
};
</script>

<style  scoped></style>
