<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

//récupérer l'id du pokémon dans l'url
const route = useRoute();
const id = route.params.id;
console.log(id);

// à partir de l'id récupéré, récupérer les informations du pokémon
const pokemon = ref({});
fetchPokemon();

//récupérer les informations du pokémon

async function fetchPokemon() {
  try {
    const response = await fetch(`http://localhost/api/pokemons/${id}`);
    pokemon.value = await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
}

const router = useRouter();

const pokemons = ref([]);

async function addPokemonsToUser(pokemonId) {
  try {
    const response = await fetch(`http://localhost/api/users/pokemons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Assurez-vous d'envoyer des données JSON
        'auth-token': `${localStorage.getItem('userToken')}`
      },
      body: JSON.stringify({ id: pokemonId }) // Ajouter l'ID du Pokémon dans le corps de la requête
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'ajout du Pokémon à l\'utilisateur');
    }

    const result = await response.json(); // Récupérer la réponse JSON
    pokemons.value.push(result); // Ajouter le Pokémon à la liste locale si nécessaire
  } catch (error) {
    console.error('Erreur lors de l\'ajout du Pokémon :', error);
  }
}

async function removePokemonsToUser() {
  try {
    const response = await fetch(`http://localhost/api/users/pokemons`, {
      method: 'DELETE',
      headers: {
        'auth-token': `${localStorage.getItem('userToken')}`
      }
    });
    pokemons.value = await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
}

async function updatePokemons() {
  try {
    const response = await fetch(`http://localhost/api/pokemons/${id}`, {
      method: 'PUT', // Utilisez PUT pour mettre à jour les données
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: pokemon.value.name,
        imageUrl: pokemon.value.imageUrl,
        types: pokemon.value.types,
        damage: pokemon.value.damage,
        hp: pokemon.value.hp,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du Pokémon');
    }

    const updatedPokemon = await response.json(); // Récupérer le Pokémon mis à jour
    pokemon.value = updatedPokemon; // Mettre à jour l'état local avec les nouvelles données

    alert('Pokémon mis à jour avec succès !'); // Alerte de succès
  } catch (error) {
    console.error('Erreur:', error);
  }
}

router.push({ name: 'pokemonsList' });
</script>

<template>
  <section>
    <img :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${String(pokemon.id).padStart(3, '0')}.png`" :alt="pokemon.name">
  </section>
  <section>
    <h1>Pokémon : {pokemon.name}</h1>
    <h2>Types : <input v-model="pokemon.types" placeholder="Entrez les types, séparés par une virgule" /></h2>
    <h2>Points de vie : <input v-model="pokemon.hp" type="number" /></h2>
    <h2>Dégâts : <input v-model="pokemon.damage" type="number" /></h2>
  </section>
  <section>
    <button @click="addPokemonsToUser()">Ajouter à mon pokédex</button>
    <button @click="removePokemonsToUser()">Enlever de mon pokédex</button>
    <button @click="updatePokemons()">Modifier les données du pokémon</button>
  </section>
</template>

<style scoped>
</style>