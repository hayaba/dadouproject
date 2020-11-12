<template>
  <v-app-bar app color="white" flat>
    <v-container class="py-0 fill-height">
      <router-link tag="li" to="/">
        <v-avatar class="mr-10" color="grey darken-1" size="32"> </v-avatar
      ></router-link>
      <h1 class="font-weight-light">Dadou Webshop</h1>
      <v-spacer></v-spacer>
      <router-link tag="li" to="/">
        <v-btn small text color="grey darken-3">
          Home <v-icon small class="ml-2">mdi-home</v-icon>
        </v-btn>
      </router-link>
      <!-- <router-link tag="li" to="/products">
        <v-btn text small color="grey darken-3">
          Product <v-icon small class="ml-2">mdi-storefront</v-icon>
        </v-btn>
      </router-link> -->

      <!-- <router-link tag="li" to="/about">
        <v-btn small text color="grey darken-3">
        About  <v-icon small class="ml-2">mdi-information</v-icon>
        </v-btn>
      </router-link> -->

      <router-link tag="li" to="/basket" v-if="basket.length > 0">
        <v-btn small text color="grey darken-3">
          <v-badge
            :content="badgeQuantity"
            :value="number"
            color="orange darken-3"
          >
            Basket <v-icon small class="lr-2">mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      </router-link>

      <router-link tag="li" to="/basket" v-else>
        <v-btn small text color="grey darken-3">
          Basket <v-icon small class="ml-2">mdi-cart</v-icon>
        </v-btn>
      </router-link>

      <router-link tag="li" to="/login" v-if="!currentUser">
        <v-btn small text color="grey darken-3">
          Login <v-icon small class="ml-2">mdi-account-circle</v-icon>
        </v-btn>
      </router-link>
      <router-link tag="li" to="/admin">
        <v-btn text small color="grey darken-3">
          Admin <v-icon small class="ml-2">mdi-account</v-icon>
        </v-btn>
      </router-link>
      <div v-if="currentUser">
        <v-menu bottom min-width="140px" rounded>
          <template v-slot:activator="{ on }">
            <v-btn icon small v-on="on">
              <v-avatar color="light-blue darken-4" size="28">
                <v-icon color="white" small> mdi-account-circle </v-icon>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar color="light-blue darken-4">
                  <v-icon color="white" large> mdi-account-circle </v-icon>
                </v-avatar>
                <p class="pa-2">
                  <small> {{ currentUser.email }}</small>
                </p>
                <v-divider class="my-3"></v-divider>
                <router-link tag="li" to="/fav">
                  <v-btn text color="grey darken-3">
                    My favorites
                    <v-icon small class="ml-2" color="red accent-4"
                      >mdi-heart</v-icon
                    >
                  </v-btn>
                </router-link>
                <v-divider class="my-3"></v-divider>
                <router-link v-if="currentUser" tag="li" to="/orders">
                  <v-btn text color="grey darken-3">
                    My Orders
                    <v-icon small class="ml-2" color="light-blue darken-4"
                      >mdi-clipboard-text</v-icon
                    >
                  </v-btn>
                </router-link>
                <v-divider class="my-3"></v-divider>
                <v-btn depressed text @click.prevent="signOut()">
                  Log out <v-icon small class="ml-2">mdi-logout</v-icon>
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
// import { db } from "../../firebase";
import firebase from "firebase";
import "firebase/firestore";
import store from "../store/index";

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    store.dispatch("setUser", user);
  } else {
    store.dispatch("setUser", null);
  }
});

export default {
  data() {
    return {
      show: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    basket() {
      return this.$store.getters.getBasketItems;
    },
    badgeQuantity() {
      var number = 0;
      for (var items in this.basket) {
        var individualItem = this.basket[items];
        number += individualItem.quantity;
      }
      return number;
    },
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("/admin");
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            alert("Wrong password");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Logged Out");
          this.$router.replace("/");
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>