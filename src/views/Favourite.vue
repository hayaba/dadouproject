<template>
  <div>
    <v-row>
      <v-col>
        <v-sheet min-height="70vh" class="pa-2" rounded="lg">
         <h1 class="font-weight-light text-center">My favourites</h1>
          <v-row>
            <v-col sm="5" md="6" v-for="item in favItems" :key="item.name">
              <v-card class="mx-auto" max-width="400" outlined rounded="lg">
                <v-img
                  height="360px"
                  :src="item.image"
                  contain
                >
               
                </v-img>
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
                  <v-btn color="orange darken-3" small text>
                    More details
                  </v-btn>

                  <v-btn color="red darken-3" small text>
                    <v-icon small>mdi-heart</v-icon>
                  </v-btn>

                  <v-btn
                    color="orange darken-3"
                    small
                    text
                    @click="addToBasket(item), number++"
                  >
                    <v-icon small>mdi-cart</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      basketDump: [],
      favDump: [],
      number: 0,
      show: false,
    };
  },
 
  methods: {
    addToBasket(item) {
      this.basketDump.push({
        name: item.name,
        price: item.price,
        quantity: 1,
      });
      this.$store.commit("addBasketItems", this.basketDump);
      this.basketDump = [];
    },
     addToFav(item) {
      this.favDump.push({
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image,
        quantity: 1,
      });
      this.$store.commit("addFavItems", this.favDump);
      this.favDump = [];
    },
  },

  computed: {
      menuItems() {
      return this.$store.getters.getBasketItems;
    },
    favItems() {
      return this.$store.getters.getFavItems;
    },
  },
};
</script>

<style lang="scss" scoped>
#item-name {
  color: #01579B;
}
</style>