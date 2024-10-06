<script setup>
import pokemonCard from './components/pokemon-card.vue';
import { ref, onMounted } from 'vue';

const pokemons = ref([]);
console.log(pokemons);

async function fetchPokemons() {
    try {
        const response = await fetch('http://localhost/api/pokemons');
        pokemons.value = await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
}

onMounted(fetchPokemons);
</script>

<template>
  <section>
    <h1>Pokédex</h1>
  </section>
  <section class="content-pokemon" data-context="base">
    <pokemonCard 
      v-for="pokemon in pokemons" 
      :key="pokemon.id"
      :pokemon="{
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types,
        hp: pokemon.hp,
        damage: pokemon.damage
      }"/>
  </section>
</template>

<style scoped>
.content-pokemon {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-around;
}
.card{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
