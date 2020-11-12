import Vue from 'vue'
import Vuex from 'vuex'
import { dbMenuAdd, dbOrders } from '../../firebase'

/*eslint-disable*/
import firebase from "firebase"
import "firebase/firestore"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0,
    basketItems: [],
    favItems: [],
    menuItems: [],
    orderItems: [],
    currentUser: null
  },
  mutations: {
    addBasketItems: (state, basketItems) => {
      if (basketItems instanceof Array) {
        basketItems.forEach(item => {
          if (state.basketItems.find((itemInArray) => item.name === itemInArray.name)) {
            item = state.basketItems.find(
              (itemInArray) => item.name === itemInArray.name
            );
            item.quantity++;
          } else {
            state.basketItems.push({
              name: item.name,
              price: item.price,
              quantity: 1,
            });
          }
        })
      }
    },
    addFavItems: (state, favItems) => {
      if (favItems instanceof Array) {
        favItems.forEach(item => {
          if (state.favItems.find((itemInArray) => item.name === itemInArray.name)) {
            item = state.favItems.find(
              (itemInArray) => item.name === itemInArray.name
            );
          } else {
            state.favItems.push({
              name: item.name,
              price: item.price,
              description: item.description,
              image: item.image,
              quantity: 1,
            });
          }
        })
      }
    },
    addCheckoutItem: (state, basketItems) => {
     dbOrders.add({
       archieve: false,
       storeOrder: false,
       orderNumbeer: state.counter++,
       orderNumber: 2,
       status: "not started",
       orderLines: state.basketItems
     })
    },
    userStatus(state, user) {
      if (user) {
        state.currentUser = user
      }
      else {
        state.currentUser = null
      }
    },
    setMenuItems: state => {
      let menuItems = []
      dbMenuAdd.onSnapshot((SnapshotItems) => {
        menuItems = []
        SnapshotItems.forEach((doc) => {
          var menuItemData = doc.data();
          menuItems.push({
            ...menuItemData,
            id: doc.id
          })
        })
        state.menuItems = menuItems

      })
    },
    setFavItems: state => {
      let favItems = []
      dbFavAdd.onSnapshot((onSnapshotItems) => {
        favItems = []
        onSnapshotItems.forEach((doc) => {
          var favItemData = doc.data();
          favItems.push({
            ...favItemData,
            id: doc.id
          })
        })
        state.favItems = favItems

      })
    },
    setOrderItems: state => {
      let orderItems = []
      dbOrder.onSnapshot((SnapshotItems) => {
        orderItems = []
        SnapshotItems.forEach((doc) => {
          var orderItemData = doc.data();
          orderItems.push({
            ...orderItemData,
            id: doc.id
          })
        })
        state.orderItems = orderItems

      })
    },
  },
  actions: {
    setCheckoutItems(context) {
      context.commit('addCheckoutItem')
    },
    setUser(context, user) {
      // setUser ({ commit }, user) {
      context.commit('userStatus', user)
      // commit('userStatus', user)
    },
    setMenuItems: context => {
      context.commit('setMenuItems')
    },
    setFavItems: context => {
      context.commit('setFavItems')
    },
    setOrderItems: context => {
      context.commit('setOrderItems')
    }
  },
  getters: {
    getBasketItems: state => state.basketItems,
    getFavItems: state => state.favItems,
    currentUser: state => state.currentUser,
    getMenuItems: state => state.menuItems,
    getOrderItems: state => state.OrderItems
  }
}
)
