<template>
  <div class="home">
    <v-sheet color="blue-grey lighten-4" rounded="lg">
      <h1 class="font-weight-light text-center">Dadou Webshop</h1>
    </v-sheet>

    <v-sheet class="mt-4" rounded="lg">
      <v-carousel hide-delimiters height="580px">
        <v-carousel-item>
         <v-row>

      
          <v-col
            sm="5"
            md="6"
            v-for="item in menuItems"
            :key="item.name"
          >
            <v-card class="mx-auto" max-width="400" outlined rounded="lg">
              <v-img height="360px" :src="item.image" contain> </v-img>
              <v-card-title id="item-name">
                {{ item.name }}
              </v-card-title>

              <v-card-subtitle class="pb-0" id="item-price">
                {{ item.price }}
              </v-card-subtitle>

              <v-card-text class="text--primary" id="item-description">
                <div>{{ item.description }}</div>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <router-link tag="li" to="/productDetails">
                  <v-btn color="orange darken-3" small text>
                    More details
                  </v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-col>
             </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "Home",

  beforeCreate() {
    this.$store.dispatch("setMenuItems");
  },
  computed: {
    menuItems() {
      return this.$store.getters.getMenuItems;
    },
  },
};
</script>
