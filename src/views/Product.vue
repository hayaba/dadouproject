<template>
  <div>
    <v-row>
      <v-col class="col-3">
        <v-sheet color="blue-grey lighten-4"  rounded="lg">
          <v-list color="transparent">
            <v-list-item link color="grey lighten-4">
              <v-list-item-content @click="selectAll()">
                <v-list-item-title>
                  <h2 class="font-weight-light">All Categories</h2>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="my-2"></v-divider>
            <v-list-item link>
              <v-list-item-content @click="selectElectronics()">
                <v-list-item-title>
                  Electronics & Lights
                  <v-icon class="ml-2"
                    >mdi-ceiling-light</v-icon
                  ></v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content @click="selectKitchen()">
                <v-list-item-title>
                  Kitchen
                  <v-icon class="ml-2">mdi-blender</v-icon></v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content @click="selectHobbies()">
                <v-list-item-title>
                  Hobbies & Free-time
                  <v-icon class="ml-2">mdi-watch</v-icon></v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>

      <v-col>
        <v-sheet color="blue-grey lighten-5"  min-height="70vh" class="pa-2" rounded="lg">
          <v-row>
            <!-- <v-col sm="5" md="6" v-for="item in menuItems" :key="item.name"> -->
            <v-col
              sm="5"
              md="6"
              v-for="item in filterCategoryItems"
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
                  <v-btn
                    color="orange darken-3"
                    small
                    text
                    @click="addToFav(item)"
                  >
                    <v-icon small>mdi-heart-outline</v-icon>
                  </v-btn>

                  <v-btn
                    color="orange darken-3"
                    small
                    text
                    @click="addToBasket(item)"
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
//import { dbMenuAdd } from "../../firebase";

export default {
  data() {
    return {
      basketDump: [],
      favDump: [],
      categoryChoice: "",
      show: false,
    };
  },
  beforeCreate() {
    this.$store.dispatch("setMenuItems");
    this.$store.dispatch("setFavItems");
  },
  /* created() {
    dbMenuAdd.get().then((querySanpshot) => {
      querySanpshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        var menuItemData = doc.data();
        this.menuItems.push({
          id: doc.id,
          name: menuItemData.name,
          description: menuItemData.description,
          price: menuItemData.price,
        });
      });
    });
  },*/
  methods: {
    selectAll() {
      this.categoryChoice = "";
    },
    selectElectronics() {
      this.categoryChoice = "electronics";
    },
    selectKitchen() {
      this.categoryChoice = "kitchen";
    },
    selectHobbies() {
      this.categoryChoice = "hobbies";
    },
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
    /*
    filterCategoryItems() {
      return this.menuItems.filter(filterItem => filterItem.category == "electronics")
    },
*/
    filterCategoryItems() {
      return this.menuItems.filter(
        (filterItem) => filterItem.category.includes(this.categoryChoice) 
      );
    },

    menuItems() {
      return this.$store.getters.getMenuItems;
    },
    basket() {
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
  color: #01579b;
}
</style>