<script setup>
import { defineProps } from 'vue';

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
</style>
