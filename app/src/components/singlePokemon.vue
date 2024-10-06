<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute(); // Récupérer les paramètres de l'URL
const router = useRouter();
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

async function removePokemon() {
  try {
    const response = await fetch(`http://localhost/api/pokemons/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Erreur lors de l'enlèvement du pokémon : ${errorDetails}`);
    }
    // go to home page
    router.push('/');

  } catch (error) {
    console.error('Erreur:', error);
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
        types: JSON.stringify(pokemon.value.types),
        hp: pokemon.value.hp,
        damage: pokemon.value.damage,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.text(); // Récupérer le corps de la réponse pour plus d'infos
      throw new Error(`Erreur lors de la mise à jour du Pokémon : ${errorDetails}`);
    }


    const updatedPokemon = await response.json(); // Récupérer le Pokémon mis à jour
    pokemon.value = updatedPokemon; // Mettre à jour l'état local avec les nouvelles données

    alert('Pokémon mis à jour avec succès !'); // Alerte de succès
  } catch (error) {
    console.error('Erreur:', error);
  }
}
</script>

<template>
  <section>
    <img :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${String(pokemon.id).padStart(3, '0')}.png`" :alt="pokemon.name">
  </section>
  <section>
    <h1>Pokémon : <input v-model="pokemon.name" placeholder="Mettre un nom" /></h1> <!-- Correction ici -->
    <h2>Types : <input v-model="pokemon.types" placeholder="Entrez les types, séparés par une virgule" /></h2>
    <h2>Points de vie : <input v-model="pokemon.hp" type="number" /></h2>
    <h2>Dégâts : <input v-model="pokemon.damage" type="number" /></h2>
  </section>
  <section>
    <button @click="removePokemon()">Supprimer le pokémon</button>
    <button @click="updatePokemons()">Modifier les données du pokémon</button>
  </section>
</template>

<style scoped>
/* Vos styles ici */
</style>
