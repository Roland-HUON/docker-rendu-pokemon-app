import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import login from './components/login.vue';
import signup from './components/signup.vue';
import PokemonsList from './components/PokemonsList.vue';
import singlePokemon from './components/singlePokemon.vue';

const routes = [
    { path: '/pokemons', component: PokemonsList, meta: { requiresAuth: true } },
    { path: '/login', component: login },
    { path: '/signup', component: signup },
    { path: '/', component: HelloWorld },
    {path: '/pokemon/:id', component: singlePokemon, name: 'singlePokemon'},
]

const router = createRouter({  
    history: createWebHistory(),
    routes,
});

export default router;