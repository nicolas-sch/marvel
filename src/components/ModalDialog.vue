<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-content">
      <button @click="closeModal" class="close-button">X</button>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </div>
</template>
  
<script>
import '@/styles/ModalDialog.scss'

export default {
  props: {
    isOpen: Boolean,
    title: String,
    description: String,
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>