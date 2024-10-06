<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute(); // Récupérer les paramètres de l'URL
const id = route.params.id; // Récupérer l'ID
const pokemon = ref({}); // Créer une référence réactive pour le Pokémon

// Fonction pour récupérer les données du Pokémon
async function fetchPokemon() {
  try {
    const response = await fetch(`http://localhost/api/pokemons/${id}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }
    pokemon.value = await response.json();
    console.log(pokemon.value); // Vérifiez ici la structure des données récupérées
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
}

// Appeler fetchPokemon lorsque le composant est monté
onMounted(fetchPokemon);

// Fonctions pour gérer les Pokémon de l'utilisateur
async function addPokemonsToUser(pokemonId) {
  // ...
}

async function removePokemonsToUser() {
  // ...
}

async function updatePokemons() {
  // ...
}
</script>

<template>
  bonjour
  <section>
    <img :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${String(pokemon.id).padStart(3, '0')}.png`" :alt="pokemon.name">
  </section>
  <section>
    <h1>Pokémon : {{ pokemon.name }}</h1> <!-- Correction ici -->
    <h2>Types : <input v-model="pokemon.types" placeholder="Entrez les types, séparés par une virgule" /></h2>
    <h2>Points de vie : <input v-model="pokemon.hp" type="number" /></h2>
    <h2>Dégâts : <input v-model="pokemon.damage" type="number" /></h2>
  </section>
  <section>
    <button @click="addPokemonsToUser(pokemon.id)">Ajouter à mon pokédex</button>
    <button @click="removePokemonsToUser()">Enlever de mon pokédex</button>
    <button @click="updatePokemons()">Modifier les données du pokémon</button>
  </section>
</template>

<style scoped>
/* Vos styles ici */
</style>
