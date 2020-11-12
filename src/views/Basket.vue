<template>
  <div>
    <v-row>
      <v-col class="col-8">
        <v-sheet min-height="70vh" class="pa-2" rounded="lg">
          <h2 id="title" class="font-weight-light">My Current Basket</h2>
          <v-divider class="my-3"></v-divider>
          <v-simple-table id="menutable" v-if="basket.length > 0">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" style="width: 30%">Quantity</th>
                  <th class="text-left" style="width: 50%">Name of item</th>
                  <th class="text-left" style="width: 20%">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in basket" :key="item.name">
                  <td>
                    <v-btn
                      color="orange darken-3"
                      small
                      text
                      @click="increaseQtn(item)"
                    >
                      <v-icon color="orange darken-3"
                        >mdi-plus-box</v-icon
                      ></v-btn
                    >
                    {{ item.quantity }}
                    <v-btn
                      color="orange darken-3"
                      small
                      text
                      @click="decreaseQtn(item)"
                    >
                      <v-icon color="orange darken-3">mdi-minus-box</v-icon>
                    </v-btn>
                  </td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.price }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-simple-table v-else>
            <p>The basket is empty</p>
          </v-simple-table>
        </v-sheet>
      </v-col>
      <v-col class="col-4">
        <v-sheet min-height="70vh" class="pa-2" rounded="lg">
          <h2 id="title" class="font-weight-light">My Current Price</h2>
          <v-divider class="my-3"></v-divider>
          <v-row>
            <v-col class="pl-8">
              <p>Subtotal:</p>
              <p>Delivery:</p>
              <v-divider class="my-3"></v-divider>
              <p><b>Total amount: </b></p>
            </v-col>
            <v-col>
              <p>{{ subTotal }} DKK</p>
              <p>10 DKK</p>
              <v-divider class="my-3"></v-divider>
              <p>
                <b> {{ total }} DKK </b>
              </p>
            </v-col>
          </v-row>
          <v-row class="pa-4" style="margin: 0">
            <v-spacer></v-spacer>
            <v-btn color="orange darken-3" text outlined @click="addCheckoutItem()"> Checkout </v-btn>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  methods: {
    addCheckoutItem() {
      this.$store.dispatch('setCheckoutItem')
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
    basket() {
      return this.$store.getters.getBasketItems;
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
#title {
  margin: 20px;
}
</style>