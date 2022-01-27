<template>
  <router-link class="router-link add-card" to="/createfridge">
      Add fridge +
      <!-- <i class="fa fa-plus fridge-plus"></i> -->
  </router-link>
</template>

<script>
export default {

}
</script>

<style>
.router-link {
  text-decoration: none;
}
.fridge-plus {
  font-size: 4rem;
  fill: black;
}
.add-card {
  width: 30%;
  height: 20vh;
  /* background: rgb(228, 228, 228); */
  background: #cdff61;
  /* border: 2px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  /* box-shadow: 1px 1px 6px 0 rgba(31, 38, 135, 0.3); */
  font-size: 2rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  color: #403D39;
}
</style>