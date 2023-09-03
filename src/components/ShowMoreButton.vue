<template>
    <div class="button-style">
        <button @click="showMore" v-if="canShowMore">Show More</button>
    </div>
</template>

<script>
import '@/styles/ShowMoreButton.scss';

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
  