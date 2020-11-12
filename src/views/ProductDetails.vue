<template>
    <v-sheet min-height="70vh" class="pa-2" rounded="lg">
        <v-row>
            <v-col>
                

  <v-carousel hide-delimiters>
     
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    >
     <v-img height="360px" :src="item.image" contain> </v-img></v-carousel-item>
  </v-carousel>


            </v-col>
            <v-col>
                
             <h1> title </h1>   

            </v-col>
        </v-row>
    </v-sheet>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>