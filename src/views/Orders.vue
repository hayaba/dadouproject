<template>
  <div>
    <v-row>
      <v-col class="col-9">
        <v-sheet class="pa-1 mb-2" rounded="lg">
          <h2 id="title" class="font-weight-light">Orders</h2>
          <v-divider class="my-3"></v-divider>
          <div id="info">
            <v-row>
              <v-col cols="12" md="1"
                ><p class="font-weight-bold pl-2">INFO:</p>
              </v-col>
              <v-col cols="12" md="5" class="pa-2 pl-5">
                <v-row align="center" class="py-2">
                  <div id="status_box" class="green darken-4 pa-1">
                    Completed
                  </div>
                  <span class="font-weight-light caption pl-1">Done</span>
                </v-row>

                <v-row align="center">
                  <div id="status_box" class="orange darken-4 pa-1">
                    In-Progress
                  </div>
                  <span class="font-weight-light caption pl-1"
                    >Working on it</span
                  >
                </v-row>

                <v-row align="center" class="py-2">
                  <div id="status_box" class="red darken-4 pa-1">
                    Not Started
                  </div>
                  <span class="font-weight-light caption pl-1"
                    >Not started yet</span
                  >
                </v-row>
              </v-col>
              <v-col cols="12" md="6">
                <v-row>
                  <div id="status_box" class="green darken-4 pa-1 ma-2">
                    Completed
                  </div>
                  <div id="status_box" class="orange darken-4 pa-1 ma-2">
                    In-Progress
                  </div>
                  <div id="status_box" class="red darken-4 pa-1 ma-2">
                    Not Started
                  </div>
                </v-row>
                <v-row>
                  <p>
                    <b> Single-click</b> to switch stage: complete =>
                    <b> Double-click</b> the box to "not started"
                  </p>
                  <span class="font-weight-light caption pl-1">
                    <v-icon color="gray darken-2"> mdi-package-down </v-icon>
                    Archive to "hide" it from orders list
                  </span>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-sheet>
        <!-- Orders list area -->
        <v-sheet min-height="70vh" class="pa-2" rounded="lg">
          <p class="font-weight-bold pl-2">ORDERS:</p>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" style="width: 10%">Order nr.</th>
                  <th class="text-left" style="width: 10%">QTY</th>
                  <th class="text-left" style="width: 34%">Item</th>
                  <th class="text-left" style="width: 10%">Price</th>
                  <th class="text-left" style="width: 16%">Status</th>
                  <th class="text-left" style="width: 10%">Archive</th>
                  <th class="text-left" style="width: 10%">Remove</th>
                </tr>
              </thead>
              <tbody class="font-weight-light">
                <tr v-for="item in orderItems" :key="item.name">
                  <td>
                    {{ item.orderNumbeer }}
                  </td>
                  <td class="py-3">
                    <p v-for="subitem in item.orderLines" :key="subitem.id">
                      {{ subitem.quantity }}
                    </p>
                  </td>
                  <td class="py-3">
                    <p v-for="subitem in item.orderLines" :key="subitem.id">
                      {{ subitem.name }}
                    </p>
                  </td>
                  <td class="py-3">
                    <p v-for="subitem in item.orderLines" :key="subitem.id">
                      {{ subitem.price }}
                    </p>
                  </td>
                  <td>
                    <div
                      id="status_box"
                      v-bind:class="item.status"
                      @click="switchStage(item.id)"
                    >
                      {{ item.status }}
                    </div>
                  </td>
                  <td>
                    <v-btn
                      color="gray darken-1"
                      small
                      text
                      @click="archiveOrderItem(item.id)"
                    >
                      <v-icon>mdi-package-down </v-icon></v-btn
                    >
                  </td>
                  <td>
                    <v-btn
                      color="red darken-1"
                      small
                      text
                      @click="deleteOrderItem(item.id)"
                    >
                      <v-icon>mdi-trash-can-outline </v-icon></v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-sheet>
      </v-col>
      <!-- Revenue area -->
      <v-col class="col-3">
        <v-sheet class="pa-2 mb-2" rounded="lg">
          <h2 id="title" class="font-weight-light">Revenue</h2>
          <v-divider class="my-3"></v-divider>
          <v-row class="pa-4"> <b> Completed Orders:</b></v-row>
          <div><p id="totalOrders">Total Orders: <span class="red--text text--lighten-1">{{orderItems.length}}</span></p></div>
          <div id="revenueList"></div>
        </v-sheet>

        <v-sheet min-height="70vh" class="pa-2" rounded="lg">
          <v-row class="pa-4"> Completed Orders </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { dbOrders } from "../../firebase";

export default {
  beforeCreate() {
    this.$store.dispatch("setOrderItems");
  },
  methods: {
    switchStage(id) {
      let selectedOrderItem = this.orderItems.filter(
        (item) => item.id === id
      )[0];

      if (selectedOrderItem.status === "inprogress") {
        dbOrders
          .doc(id)
          .update({ status: "complete" })
          .then(() => {});
      } else if (selectedOrderItem.status === "incomplete") {
        dbOrders
          .doc(id)
          .update({ status: "inprogress" })
          .then(() => {});
      } else if (selectedOrderItem.status === "complete") {
        dbOrders
          .doc(id)
          .update({ status: "incomplete" })
          .then(() => {});
      }
    },
    archiveOrderItem(id) {
      dbOrders
        .doc(id)
        .update({ archive: true, storeOrder: true })
        .then(() => {
          console.log("Order is archived");
        });
    },
    deleteOrderItem(id) {
      dbOrders
        .doc(id)
        .delete()
        .then(() => {
          console.log("Order is deleted");
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {});
    },
  },
  computed: {
    orderItems() {
      return this.$store.getters.getOrderItems;
    },
  },
};
</script>

<style lang="scss" scoped>
#title {
  margin: 20px;
}
#status_box {
  border-radius: 2px;
  // color: white;
}
</style>