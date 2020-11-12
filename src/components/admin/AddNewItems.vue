<template>
  <div>
    <v-row>
      <v-col>
        <v-sheet min-height="70vh" class="pa-2" rounded="lg">
          <h2 class="font-weight-light">Add New Product</h2>
          <v-divider class="my-2"></v-divider>
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                label="Product Name"
                v-model="name"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                label="Price in DKK"
                v-model="price"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-file-input
            lable="File input"
            @change="uploadImage"
            outlined
            dense
          ></v-file-input>
          <v-row>
            <v-col cols="12">
              <v-textarea
                label="Description"
                v-model="description"
                outlined
                dense
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row style="margin: 0">
            <v-spacer></v-spacer>
            <router-link tag="li" to="/admin">
              <v-btn
                @click="addNewMenuItem()"
                :disabled="btnDisable"
                color="green darken-3"
                text
                outlined
              >
                Add Product
              </v-btn></router-link
            >
            <router-link tag="li" to="/">
              <v-btn class="mr-1" color="red darken-3" text outlined>
                Cancel
              </v-btn></router-link
            >
          </v-row>
        </v-sheet>
      </v-col>
      <v-col class="col-4">
        <v-sheet class="pa-2" rounded="lg">
          <h2 class="font-weight-light">Preview</h2>
          <v-divider class="my-2"></v-divider>
          <v-card class="mx-auto" max-width="400" outlined rounded="lg">
                 <v-img
                  height="360px"
                  :src="image"
                  contain
                >
               
                </v-img>
                   <v-card-title id="item-name">
                    {{ name }}
                  </v-card-title>

            <v-card-subtitle class="pb-0" id="item-price">
              {{ price }}
            </v-card-subtitle>

            <v-card-text class="text--primary" id="item-description">
              <div>{{ description }}</div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="orange darken-3" small text> More details </v-btn>

              <v-btn color="orange darken-3" small text>
                <v-icon small>mdi-heart-outline</v-icon>
              </v-btn>

              <v-btn color="orange darken-3" small text>
                <v-icon small>mdi-cart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { dbMenuAdd, fb } from "../../../firebase";

export default {
  data() {
    return {
      name: "",
      description: "",
      price: "",
      image: null,
      btnDisable: true,
    };
  },
  methods: {
    uploadImage(e) {
    
      let file = e;
      console.log(e);
      // Create a root reference
      var storageRef = fb.storage().ref("products/" + file.name);
      let uploadTask = storageRef.put(file);
      
      uploadTask.on(
        "state_changed",
        // eslint-disable-next-line no-unused-vars
        (snapshot) => {},
        // eslint-disable-next-line no-unused-vars
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.image = downloadURL;
            this.btnDisable = false;
            console.log("File available at", downloadURL);
          });
        }
      );
    },
    addNewMenuItem() {
      dbMenuAdd.add({
        name: this.name,
        description: this.description,
        price: this.price,
        image: this.image,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#item-name {
  color: #01579B;
}
</style>