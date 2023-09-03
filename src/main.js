import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importe o Vue Router
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(createPinia());
app.use(router); // Use o Vue Router

app.mount('#app');
