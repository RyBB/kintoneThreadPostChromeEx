<template>
  <div>
    <span>{{ text }}</span>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AnimeChan',
  data() {
    return {
      anime: '',
      text: '',
      chara: '',
    }
  },
  async mounted() {
    const url = 'https://animechanapi.xyz/api/quotes/random';
    const resp = await axios.get(url);
    this.anime = resp.data.data[0].anime;
    this.text = resp.data.data[0].quote;
    this.chara = resp.data.data[0].character;
  }
}
</script>

<style></style>