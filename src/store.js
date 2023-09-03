import { defineStore } from 'pinia';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const publicKey = 'b81a4267871891036965e4f23678bb3e';
const privateKey = 'f9d23e623c8c50347303121267767c99f1adb4c3';

const instance = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public',
});

instance.interceptors.request.use(config => {
  const timestamp = new Date().getTime();
  const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();

  config.params = {
    ...config.params,
    ts: timestamp,
    apikey: publicKey,
    hash: hash,
  };

  return config;
});

export const useMarvelStore = defineStore('marvel', {
    state: () => ({
        characters: JSON.parse(localStorage.getItem('characters')) || [],
      }),
      actions: {
        async fetchCharacters() {
          try {
            const response = await instance.get('/characters');
            this.characters = response.data.data.results;
    
            // Salvar no localStorage
            localStorage.setItem('characters', JSON.stringify(this.characters));
          } catch (error) {
            console.error('Error fetching characters:', error);
          }
        },
    async fetchCharacterComics(characterId) {
      try {
        const response = await instance.get(`/characters/${characterId}/comics`);
        return response.data.data.results;
      } catch (error) {
        console.error('Error fetching character comics:', error);
      }
    },
    async fetchCharacterSeries(characterId) {
      try {
        const response = await instance.get(`/characters/${characterId}/series`);
        return response.data.data.results;
      } catch (error) {
        console.error('Error fetching character series:', error);
      }
    },
  },
});