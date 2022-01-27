<template>
  <header class="header-container">
    <div class="logo-container">CoFridge</div>

    <nav class="nav-container">
      
      <ul class="tab-list">
        <li>
          <router-link class="router-link" to="/">Explore</router-link>
        </li>
        <li>
          <router-link class="router-link" to="/fridge">My Fridges</router-link>
        </li>
        <li>
          <router-link class="router-link" to="/profile">Profile</router-link>
        </li>
        <li>
          <router-link class="router-link" to="/settings">Settings</router-link>
        </li>
      </ul>
    </nav>

    <div class="search-bar-container"><SearchBar /></div>
  </header>
</template>

<script>
import SearchBar from './SearchBar.vue';

export default {
  name: 'Header',
  props: ['signedInUser','userProfileOwner'],
  components: {SearchBar},
};
</script>

<style  scoped></style>
