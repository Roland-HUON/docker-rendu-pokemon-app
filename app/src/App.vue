<script setup>
import HelloWorld from './components/HelloWorld.vue'
import login from './components/login.vue'
import signup from './components/signup.vue'
import pokemonCard from './components/pokemon-card.vue';
</script>

<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Signup</router-link>
      <router-link to="/pokemons">Mon pokédex</router-link>
    </nav>
    <router-view /> 
  </div>
</template>

<style scoped>

nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem;
  font-size: xx-large;
}

</style>

<script>
export default {
  name: 'App',
};
</script>