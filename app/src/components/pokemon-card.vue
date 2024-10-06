<script setup>
import { defineProps } from 'vue';
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

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        typeof value.id === 'number' &&
        typeof value.name === 'string' &&
        Array.isArray(value.types) &&
        typeof value.hp === 'number' &&
        typeof value.damage === 'number'
      );
    }
  }
});
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
  <div class="card">
    <div class="card-image">
      <img :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${String(pokemon.id).padStart(3, '0')}.png`" :alt="pokemon.name">
    </div>
    <div class="card-text">
      <h2>{{ pokemon.name }}</h2>
      <div class="pokemon-information">
        <div class="type">
          <p v-for="(type, index) in pokemon.types" :key="index">{{ type }}</p>
        </div>
        <div class="attribut">
          <p>Points de vie : {{ pokemon.hp }}</p>
          <p>Dégâts : {{ pokemon.damage }}</p>
        </div>
      </div>
    </div>
  </div>
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
