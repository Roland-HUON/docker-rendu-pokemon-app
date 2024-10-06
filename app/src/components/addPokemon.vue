<template>
    <section>
        <h1>Add a new pokemon</h1>
    </section>
    <section>
        <form @submit.prevent="addPokemon">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="pokemon.name" required>
            <label for="types">Types</label>
            <input type="text" id="types" v-model="pokemon.types" required>
            <label for="hp">HP</label>
            <input type="number" id="hp" v-model="pokemon.hp" required>
            <label for="damage">Damage</label>
            <input type="number" id="damage" v-model="pokemon.damage" required>
            <button type="submit">Add</button>
        </form>
    </section>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute(); // Récupérer les paramètres de l'URL
const router = useRouter();
const id = route.params.id; // Récupérer l'ID
const pokemon = ref({}); // Créer une référence réactive pour le Pokémon

async function addPokemon(pokemonId) {
  try {
    const response = await fetch(`http://localhost/api/pokemons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Assurez-vous d'envoyer des données JSON
        'auth-token': `${localStorage.getItem('userToken')}`
      },
      body: JSON.stringify({ 
        id: pokemonId, 
        name: pokemon.value.name,
        types: pokemon.value.types.split(',').map(type => type.trim()),
        hp: pokemon.value.hp,
        damage: pokemon.value.damage,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.text(); // Récupérer le corps de la réponse pour plus d'infos
      throw new Error(`Erreur lors de l'ajout du Pokémon à l'utilisateur : ${errorDetails}`);
    }

    const result = await response.json(); // Récupérer la réponse JSON
    router.push('/');
  } catch (error) {
    console.error('Erreur lors de l\'ajout du Pokémon :', error);
  }
}
</script>