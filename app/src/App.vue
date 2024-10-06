<script setup>
import HelloWorld from './components/HelloWorld.vue'
import login from './components/login.vue'
import signup from './components/signup.vue'
import pokemonCard from './components/pokemon-card.vue';
</script>

<template>
  <div id="app">
    <router-view /> 
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  name: 'App',
};
</script>