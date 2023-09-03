<template>
  <TopBar>
    <router-link to="/" class="home-button">Home</router-link>
  </TopBar>
    <div>
      <div class="character-details" v-if="character">
        <div class="character-image-container">
          <div class="character-name">{{ character.name }}</div>
          <div class="character-image">
            <img :src="character.thumbnail.path + '.' + character.thumbnail.extension" alt="Imagem do Personagem" />
          </div>
        </div>
        <div class="character-comics-container">
          <div class="comics">
            <h2>Comics</h2>
            <ul>
              <li v-for="comic in characterComics.slice(0, comicsVisible)" :key="comic.id">
                <a @click="openModal(comic, 'comic')">{{ comic.title }}</a>
            </li>
            </ul>
            <show-more-button
                :current-visible="comicsVisible"
                :total-items="characterComics.length"
                :increment="4"
                @show-more="onShowMoreComics"
            >
            </show-more-button>  
          </div>
          <div class="series">
            <h2>Series</h2>
            <ul>
              <li v-for="serie in characterSeries.slice(0, seriesVisible)" :key="serie.id">
                <a @click="openModal(serie, 'serie')">{{ serie.title }}</a>
            </li>
            </ul>
            <show-more-button
                :current-visible="seriesVisible"
                :total-items="characterSeries.length"
                :increment="4"
                @show-more="onShowMoreSeries"
            >
            </show-more-button>          
            </div>

            <modal-dialog :isOpen="isModalOpen" :title="selectedItem.title" :description="selectedItem.description" @close="closeModal" />

        </div>
      </div>
      <div v-else>
        Character not found.
      </div>
    </div>
  </template>
  
  
  <script>
  import { computed, onMounted, ref } from 'vue';
  import { useMarvelStore } from '@/store';
  import '@/styles/CharacterDetails.scss';
  import ShowMoreButton from '@/components/ShowMoreButton.vue';
  import ModalDialog from '@/components/ModalDialog.vue';
  import TopBar from '@/components/TopBar.vue';
  
  
  export default {
    name: 'CharacterDetails',
    components: {
    ShowMoreButton,
    ModalDialog,
    TopBar,
  },
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
      const comicsVisible = ref(4);
      const seriesVisible = ref(4);

      
        const isModalOpen = ref(false);
        const selectedItem = ref({ title: '', description: '' });
        const selectedItemType = ref('');
  
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

    const openModal = (item, type) => {
      selectedItem.value = item;
      selectedItemType.value = type;
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };
      
  
      return {
        character,
        characterComics,
        characterSeries,
        comicsVisible,
        seriesVisible,
        isModalOpen,
      selectedItem,
      selectedItemType,
      openModal,
      closeModal,
      };
    },
    methods: {
    onShowMoreSeries(increment) {
      this.seriesVisible += increment;
    },
    onShowMoreComics(increment) {
      this.comicsVisible += increment;
    },
  },
  };
  </script>
  