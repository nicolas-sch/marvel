<template>
    <div>
      <button @click="showMore" v-if="canShowMore">Show More</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentVisible: Number,
      totalItems: Number,
      increment: Number,
    },
    computed: {
      canShowMore() {
        return this.currentVisible < this.totalItems;
      },
    },
    methods: {
      showMore() {
        this.$emit('show-more', this.increment);
      },
    },
  };
  </script>
  