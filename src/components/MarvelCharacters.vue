<template>
    <div class="character-wrapper">
      <div class="character-card" v-for="character in characters" :key="character.id">
        <div class="character-image">
          <img :src="character.thumbnail.path + '.' + character.thumbnail.extension" alt="Character Image" />
        </div>
        <div class="character-name">{{ character.name }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue';
  import { useMarvelStore } from '@/store';
  import '@/styles/MarvelCharacters.scss';
  
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
  