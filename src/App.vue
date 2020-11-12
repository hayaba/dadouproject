<template>
  <v-app id="app">
      <Header />

    <v-main class="grey lighten-4">
      <v-container>
         <router-view></router-view> 
     
      </v-container>
      
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header";

export default {
   components: {
    Header,
  },
};
</script>

<style lang="scss">
li {
  list-style: none;
  margin: 0 20px 0 0;
}

</style>