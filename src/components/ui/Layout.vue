<template>
  <div class="grid-container">
    <Header class="header" />

    <main class="main">
      <Notification />
      <LostGuide v-if="!signedInUser" />

      <section v-else>
        <PageTitle
          :signedInUser="signedInUser"
          :greetMsg="greetMsg"
        />
        <slot></slot>
      </section>
    </main>

    <div class="sidebar sidebar-left"></div>

    <div class="sidebar sidebar-right"></div>

    <Footer class="footer" />
  </div>
</template>

<script>
import { eventBus } from '../../main.js';

import Header from './Header.vue';
import LostGuide from './LostGuide.vue';
import PageTitle from './PageTitle.vue';
import Footer from './Footer.vue';
import Notification from '../ui/Notification.vue';

export default {
  name: 'Layout',
  props: ['signedInUser', 'greetMsg'],
  data() {
    return {
    };
  },
  components: {
    Header,
    Footer,
    LostGuide,
    PageTitle,
    Notification,
  },
};
</script>

<stylescoped></style>
