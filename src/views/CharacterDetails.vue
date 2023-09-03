<template>
    <div>
        <router-link to="/" class="back-button">Home</router-link>

      <div class="character-details" v-if="character">
        <div>
            <div class="character-name">{{ character.name }}</div>
            <div class="character-image">
            <img :src="character.thumbnail.path + '.' + character.thumbnail.extension" alt="Imagem do Personagem" />
            </div>
        </div>
        <div>
            <div class="comics">
            <h2>Comics</h2>
            <ul>
                <li v-for="comic in characterComics" :key="comic.id">{{ comic.title }}</li>
            </ul>
            </div>
            <div class="series">
            <h2>Series</h2>
            <ul>
                <li v-for="serie in characterSeries" :key="serie.id">{{ serie.title }}</li>
            </ul>
            </div>
        </div>
      </div>
      <div v-else>
        Personagem não encontrado.
      </div>
    </div>
  </template>
  
  <script>
  import { computed, onMounted, ref } from 'vue';
  import { useMarvelStore } from '@/store';
  import '@/styles/CharacterDetails.scss';
  
  export default {
    name: 'CharacterDetails',
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const marvelStore = useMarvelStore();
      const characterId = ref(null);
      const character = computed(() =>
        marvelStore.characters.find((char) => char.id === characterId.value)
      );
      const characterComics = ref([]);
      const characterSeries = ref([]);
  
      onMounted(async () => {
        characterId.value = +props.id;
  
        if (!character.value) {
          const charactersFromLocalStorage = JSON.parse(localStorage.getItem('characters')) || [];
          const characterFromLocalStorage = charactersFromLocalStorage.find(char => char.id === characterId.value);
  
          if (characterFromLocalStorage) {
            marvelStore.characters = charactersFromLocalStorage;
          } else {
            marvelStore.fetchCharacters().then(() => {
              const characterAfterFetch = computed(() =>
                marvelStore.characters.find((char) => char.id === characterId.value)
              );
  
              if (!characterAfterFetch.value) {
                window.alert('Character not found')
              } else {
                characterComics.value = marvelStore.fetchCharacterComics(characterId.value);
                characterSeries.value = marvelStore.fetchCharacterSeries(characterId.value);
              }
            });
          }
        } else {
          characterComics.value = await marvelStore.fetchCharacterComics(characterId.value);
          characterSeries.value = await marvelStore.fetchCharacterSeries(characterId.value);
        }
      });
  
      return {
        character,
        characterComics,
        characterSeries,
      };
    },
  };
  </script>
  