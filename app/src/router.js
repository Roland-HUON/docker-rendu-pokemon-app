import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import login from './components/login.vue';
import signup from './components/signup.vue';
import PokemonsList from './components/PokemonsList.vue';

const routes = [
    { path: '/pokemons', component: PokemonsList, meta: { requiresAuth: true } },
    { path: '/login', component: login },
    { path: '/signup', component: signup },
    { path: '/', component: HelloWorld }
]

const router = createRouter({  
    history: createWebHistory(),
    routes,
});

export default router;