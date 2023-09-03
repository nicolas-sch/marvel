<template>
    <div>
      <h1>Personagens da Marvel</h1>
      <div class="character-card" v-for="character in characters" :key="character.id">
        <router-link :to="{ name: 'CharacterDetails', params: { id: character.id } }">
          <div class="character-image">
            <img :src="character.thumbnail.path + '.' + character.thumbnail.extension" alt="Imagem do Personagem" />
          </div>
          <div class="character-name">{{ character.name }}</div>
        </router-link>
      </div>
    </div>
  </template>
  
  <!-- Resto do código permanece igual -->
  
  
  
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