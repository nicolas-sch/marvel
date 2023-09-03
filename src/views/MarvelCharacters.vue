<template>
    <TopBar>
        <div>
            <label for="characterSelect">Select your character:</label>
            <select id="characterSelect" v-model="selectedCharacterId">
                <option value="">All</option>
                <option v-for="character in characters" :key="character.id" :value="character.id">{{ character.name }}</option>
            </select>
        </div>
    </TopBar>
    <div class="characters-container">
        <div class="character-card" v-for="character in filteredCharacters" :key="character.id">
        <router-link :to="{ name: 'CharacterDetails', params: { id: character.id } }">
            <div class="character-image">
            <img :src="character.thumbnail.path + '.' + character.thumbnail.extension" alt="Imagem do Personagem" />
            </div>
            <p class="character-name">{{ character.name }}</p>
        </router-link>
        </div>
    </div>
</template>
  
<script>
import { computed, onMounted, ref } from 'vue';
import { useMarvelStore } from '@/store';
import '@/styles/MarvelCharacters.scss';
import TopBar from '@/components/TopBar.vue';
  
export default {
    name: 'MarvelCharacters',
    components: {
        TopBar,
    },
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
  