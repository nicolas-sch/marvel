<template>
    <div class="top-bar">
        <img src="../assets/marvel-logo.png" alt="Marvel Logo" />
        <slot></slot>
    </div>
</template>
  
<script>
import '@/styles/TopBar.scss';

export default {
    name: 'TopBar',
};
</script>
  