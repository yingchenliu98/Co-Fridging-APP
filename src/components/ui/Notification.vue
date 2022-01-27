<template>
  <!-- <Modal v-if="isModalVisible">
    <template v-slot:header>
      <h2>{{ title }}</h2>
    </template>

    <template v-slot:body>
      <p>{{ message }}</p>
    </template>

    <template v-slot:footer>
      <button class="btn btn-modal" @click="closeModal">OK</button>
    </template>
  </Modal> -->
  <transition name="notification">
    <div class="notification-wrapper" v-if="isModalVisible">
      <div class="notification">
        <h2>{{ title }}</h2>
        <p class="notification-text">{{ message }}</p>
        <!-- <button class="btn btn-modal" @click="closeModal">OK</button> -->
      </div>
    </div>
  </transition>
</template>

<script>
import { eventBus } from "../../main";

// import Modal from './Modal.vue';

export default {
  name: "Notification",
  components: {},
  data() {
    return {
      message: "",
      title: "",
      isModalVisible: false,
    };
  },
  methods: {
    closeModal() {
      this.isModalVisible = false;
    },
    timeOut() {
      setTimeout(() => {
        this.isModalVisible = false;
      }, 2500);
    },
  },
  created() {
    /* --------------------------------- GENERAL -------------------------------- */
    eventBus.$on("response-error", (data) => {
      this.isModalVisible = true;
      this.title = "Oops...";
      this.message = data.data.data.error;
      console.log(data);
      this.timeOut();
    });
    eventBus.$on("response-change", (data) => {
      this.isModalVisible = true;
      this.title = "Congrats 🎉!";
      this.message = data.data.message;
      this.timeOut();
    });
  },
};
</script>

<style s scoped>
.notification-wrapper {
  position: fixed;
  width: 100%;
  top: 20px;
  z-index: 299;
}
.notification {
  padding: 20px;
  color: white;
  background: #f6652c;
  border-radius: 10px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin: 0 auto;
  font-family: "Montserrat", sans-serif;
}
.notification-text {
  padding: 0;
  margin: 0;
}
.notification-enter-from {
  opacity: 0;
  transform: translateY(-100px);
}
.notification-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.notification-leave-from {
  opacity: 1;
}
.notification-leave-to {
  opacity: 0;
}
.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s ease;
}
</style>
