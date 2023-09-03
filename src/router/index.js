import { createRouter, createWebHistory } from 'vue-router';
import MarvelCharacters from '../views/MarvelCharacters.vue';
import CharacterDetails from '../views/CharacterDetails.vue';

const routes = [
  {
    path: '/',
    name: 'MarvelCharacters',
    component: MarvelCharacters,
  },
  {
    path: '/character/:id',
    name: 'CharacterDetails',
    component: CharacterDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
