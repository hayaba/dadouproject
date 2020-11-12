<template>
  <div>
    <v-snackbar top v-model="successfulUpdate" :timeout="timeout">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
<v-sheet color="blue-grey lighten-4"  rounded="lg">
    <h1 class="font-weight-light text-center">Admin</h1>
</v-sheet>
    <v-row>
      <v-col class="col-3">
        <v-sheet color="blue-grey lighten-4" rounded="lg">
          <v-list color="transparent">
            <v-list-item color="grey lighten-4">
              <v-list-item-content>
                <v-list-item-title>
                  <h2 class="font-weight-light">Categories</h2>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="my-2"></v-divider>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title> Electronics & Lights <v-icon class="ml-2">mdi-ceiling-light</v-icon></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title> Kitchen <v-icon class="ml-2">mdi-blender</v-icon></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title> Hobbies & Free-time  <v-icon class="ml-2">mdi-watch</v-icon></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>

      <v-col>
        <v-sheet color="blue-grey lighten-5"  min-height="70vh" class="pa-2" rounded="lg">
          <v-row>
            <v-col>
              <v-btn color="orange darken-3" text to="/addNew">
                <v-icon>mdi-plus</v-icon>
                <span style="padding: 0 10px">Add New Product</span>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="5" md="6" v-for="item in menuItems" :key="item.name">
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

                  <v-btn
                    color="orange darken-3"
                    small
                    text
                    @click.stop="dialog = true"
                    @click="editItem(item)"
                  >
                    <v-icon>mdi-pencil-outline</v-icon>
                  </v-btn>

                  <v-btn
                    color="red darken-1"
                    small
                    text
                    @click="deleteItem(item.id)"
                  >
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-dialog v-model="dialog" max-width="440">
        <v-card>
          <v-row>
            <v-col>
              <v-sheet min-height="70vh" class="pa-2" rounded="lg">
                <h2 class="font-weight-light">Edit Product</h2>
                <v-divider class="my-2"></v-divider>
                <v-row>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      label="Product Name"
                      v-model="item.name"
                      required
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      label="Price in DKK"
                      v-model="item.price"
                      required
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      label="Description"
                      v-model="item.description"
                      outlined
                      dense
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row style="margin: 0">
                  <v-spacer></v-spacer>
                  <v-btn
                    class="mr-2"
                    @click="updateItem()"
                    @click.stop="dialog = false"
                    color="green darken-3"
                    text
                    outlined
                  >
                    Update Product
                  </v-btn>
                  <router-link tag="li" to="/">
                    <v-btn
                      color="red darken-3"
                      text
                      outlined
                      @click.stop="dialog = false"
                    >
                      Cancel
                    </v-btn></router-link
                  >
                </v-row>
              </v-sheet>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { dbMenuAdd } from "../../firebase";

export default {
  data() {
    return {
      basket: [],
      item: [],
      dialog: false,
      activeEditeItem: null,
      successfulUpdate: false,
      text: "The product has been updated.",
      timeout: 2000,
    };
  },
  beforeCreate() {
    this.$store.dispatch("setMenuItems");
  },
  methods: {
    editItem(item) {
      this.item = item;
      this.activeEditeItem = item.id;
    },
    updateItem() {
      dbMenuAdd
        .doc(this.activeEditeItem)
        .update(this.item)
        .then(() => {
          this.successfulUpdate = true;
          console.log("Document successfully updated!");
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    deleteItem(id) {
      dbMenuAdd
        .doc(id)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    },
    addToBasket(item) {
      if (this.basket.find((itemInArray) => item.name === itemInArray.name)) {
        item = this.basket.find(
          (itemInArray) => item.name === itemInArray.name
        );
        this.increaseQtn(item);
      } else {
        this.basket.push({
          name: item.name,
          price: item.price,
          quantity: 1,
        });
      }
    },
    increaseQtn(item) {
      item.quantity++;
    },
    decreaseQtn(item) {
      item.quantity--;
      if (item.quantity === 0) {
        this.basket.splice(this.basket.indexOf(item), 1);
      }
    },
  },
  computed: {
    menuItems() {
      return this.$store.getters.getMenuItems;
    },
    subTotal() {
      var subCost = 0;
      for (var items in this.basket) {
        var individualItem = this.basket[items];
        subCost += individualItem.quantity * individualItem.price;
      }
      return subCost;
    },
    total() {
      var deliveryPrice = 10;
      var totalCost = this.subTotal;
      return totalCost + deliveryPrice;
    },
  },
};
</script>

<style lang="scss" scoped>
#item-name {
  color: #01579B;
}
</style>