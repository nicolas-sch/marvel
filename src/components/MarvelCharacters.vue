<template>
    <div>
      <h1>Personagens da Marvel</h1>
=      <label for="characterSelect">Select your character:</label>
      <select id="characterSelect" v-model="selectedCharacterId">
        <option value="">Todos</option>
        <option v-for="character in characters" :key="character.id" :value="character.id">{{ character.name }}</option>
      </select>
      
      <div class="character-card" v-for="character in filteredCharacters" :key="character.id">
        <router-link :to="{ name: 'CharacterDetails', params: { id: character.id } }">
          <div class="character-image">
            <img :src="character.thumbnail.path + '.' + character.thumbnail.extension" alt="Imagem do Personagem" />
          </div>
          <div class="character-name">{{ character.name }}</div>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { computed, onMounted, ref } from 'vue';
  import { useMarvelStore } from '@/store';
  import '@/styles/MarvelCharacters.scss';
  
  export default {
    name: 'MarvelCharacters',
    setup() {
      const marvelStore = useMarvelStore();
      const characters = computed(() => marvelStore.characters);
      const selectedCharacterId = ref('');
  
      onMounted(() => {
        marvelStore.fetchCharacters();
      });
  
      const filteredCharacters = computed(() => {
        if (!selectedCharacterId.value) {
          return characters.value;
        } else {
          return characters.value.filter(character => character.id === selectedCharacterId.value);
        }
      });
  
      return {
        characters,
        selectedCharacterId,
        filteredCharacters,
      };
    },
  };
  </script>
  