<template>
  <div class="box">
    <section>
      <p>shortcuts</p>
      <date-picker v-model="value1" :shortcuts="shortcuts" placeholder="Select date"></date-picker>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Basic',
  data() {
    return {
      value1: null,
      shortcuts: [
        {
          text: 'Today',
          onClick() {
            const date = new Date();
            return date;
          },
        },
        {
          text: 'Tomorrow',
          onClick() {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            return date;
          },
        },
      ],
    };
  },
};
</script>