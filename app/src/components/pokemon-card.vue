<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

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

function goToSinglePokemon() {
  console.log('goToSinglePokemon');
  router.push({ name: 'singlePokemon', params: { id: props.pokemon.id } });
}
</script>

<template>
  <div class="card" @click="goToSinglePokemon()">
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
          <p>PV : {{ pokemon.hp }}</p>
          <p>Dmg : {{ pokemon.damage }}</p>
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
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  max-width: 300px;
  margin: 15px ;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.card-image {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-image img {
  max-height: 175px;
  transition: transform 0.3s;
}

.card:hover .card-image img {
  transform: scale(1.1);
}


.card-text h2 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.pokemon-information {
  justify-content: space-around;
  margin-top: 10px;
}

.type {
  padding: 5px 10px;
  border-radius: 8px;
}

.type p {
  font-size: 14px;
  color: #6c757d;
}

.attribut {
  font-size: 14px;
}

.attribut p {
  margin: 5px 0;
  color: #495057;
  font-weight: 500;
}



</style>
