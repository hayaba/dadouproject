<template>
  <v-sheet rounded="lg">
    <v-row>
      <v-col offset-md="3" md="6" xs="12">
        <h1 class="font-weight-light text-center">Administrator Login</h1>
        <div id="info">
          <v-text-field v-model="email" label="Email" required outlined>
          </v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            @click:append="show = !show"
            required
            outlined
          >
          </v-text-field>

          <v-btn color="green darken-3" outlined @click.prevent="signIn()">
            Login
          </v-btn>
          <v-btn
            color="red darken-3"
            class="ml-3"
            outlined
            @click.prevent="signOut()"
          >
            Sign Out
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  data() {
    return {
      email: "",
      password: "",
      show: false,
    };
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
#info {
  padding: 20px 0;
}
</style>