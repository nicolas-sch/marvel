<template>
    <div>
      <h1>Marvel</h1>
      <ul>
        <li v-for="character in characters" :key="character.id">
          {{ character.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
import { computed, onMounted } from 'vue';
import { useMarvelStore } from '@/store';

export default {
  name: 'MarvelCharacters',
  setup() {
    const marvelStore = useMarvelStore();
    const characters = computed(() => marvelStore.characters);

    onMounted(() => {
      marvelStore.fetchCharacters();
    });

    return {
      characters,
    };
  },
};
</script>
