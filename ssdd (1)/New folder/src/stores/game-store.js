import { defineStore } from "pinia";
import axios from 'axios';
export const useGameStore = defineStore("game", {
  state: () => ({

//     axios.get('http://localhost:3000/api/file/game'
//  )
//         .then(function (response) {
//           console.log(response);
//            gameList = response.result;
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//         gameList: [

//    ]
onInit() {
        console.log("kk");
        axios.get('http://localhost:3000/api/file/game', {
        })
          .then(function (response) {
            gameList = response.data.result;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      gameList: [
        {
          img_url: "games/valo.png",
          name: "VALORANT",
          payment: [
            {
              name: "TrueMoney",
              image: "images/payments/true.png",
              detail: "123-456-789",
              status: true,
            },
            {
              name: "PayPal",
              image: "images/payments/paypal.png",
              detail: "123-456-789",
              status: true,
            },
            {
              name: "CreditCard",
              image: "images/payments/credit.png",
              detail: "123-456-789",
              status: true,
            },
            {
              name: "PromptPay",
              image: "images/payments/prompt-pay.png",
              detail: "123-456-789",
              status: true,
            },
          ],
          package: [
            {
              point: 540,
              unit: "point",
              price: 300,
              inStock: 10,
              status: true,
            },
            {
              point: 540,
              unit: "point",
              price: 300,
              inStock: 10,
              status: true,
            },
            {
              point: 540,
              unit: "point",
              price: 300,
              inStock: 10,
              status: true,
            },
          ],
        },
        {
          img_url: "games/apex.png",
          name: "APEX",
          payment: [
            {
              name: "TrueMoney",
              image: "images/payments/true.png",
              detail: "123-456-789",
              status: true,
            },
            {
              name: "PayPal",
              image: "images/payments/paypal.png",
              detail: "123-456-789",
              status: true,
            },
            {
              name: "CreditCard",
              image: "images/payments/credit.png",
              detail: "123-456-789",
              status: true,
            },
            {
              name: "PromptPay",
              image: "images/payments/prompt-pay.png",
              detail: "123-456-789",
              status: true,
            },
          ],
          package: [
            {
              point: 540,
              unit: "point",
              price: 300,
              inStock: 10,
              status: true,
            },
            {
              point: 540,
              unit: "point",
              price: 300,
              inStock: 10,
              status: true,
            },
            {
              point: 540,
              unit: "point",
              price: 300,
              inStock: 10,
              status: true,
            },
          ],
        },
        {
          img_url: "images/games/genshin.png",
          name: "Genshin Impact",
          payment: [
            {
              name: "TrueMoney",
              image: "images/payments/true.png",
              detail: "123-456-789",
              status: true,
            },
            {
              name: "PayPal",
              image: "images/payments/paypal.png",
              detail: "123-456-789",
              status: true,
            },
            {
              name: "CreditCard",
              image: "images/payments/credit.png",
              detail: "123-456-789",
              status: true,
            },
            {
              name: "PromptPay",
              image: "images/payments/prompt-pay.png",
              detail: "123-456-789",
              status: true,
            },
          ],
          package: [
            {
              point: 540,
              unit: "point",
              price: 300,
              inStock: 10,
              status: true,
            },
          ],
        },
        {
          img_url: "images/games/roblox.png",
          name: "Roblox",
          payment: [
            {
              name: "TrueMoney",
              image: "images/payments/true.png",
              detail: "123-456-789",
              status: true,
            },
            {
              name: "PayPal",
              image: "images/payments/paypal.png",
              detail: "123-456-789",
              status: true,
            },
            {
              name: "CreditCard",
              image: "images/payments/credit.png",
              detail: "123-456-789",
              status: true,
            },
            {
              name: "PromptPay",
              image: "images/payments/prompt-pay.png",
              detail: "123-456-789",
              status: true,
            },
          ],
          package: [
            {
              point: 540,
              unit: "point",
              price: 300,
              inStock: 10,
              status: true,
            },
            {
              point: 540,
              unit: "point",
              price: 300,
              inStock: 10,
              status: true,
            },
            {
              point: 540,
              unit: "point",
              price: 300,
              inStock: 10,
              status: true,
            },
          ],
        },
      ],
  }),
  actions:{
    setGameListData(payloads){
      this.gameList=payloads;
    },
    onDeleteGame(name) {
      console.log(name);
      this.gameList = this.gameList.filter((data) => data.name != name);
    },
    onCreateGame(payload) {
      this.gameList.push(payload);
    },
    onDeletePayment(name, payment) {
      const selectedGame = this.gameList.findIndex((data) => data.name == name);
      this.gameList[selectedGame].payment = payment;
    },
    onDeletePackage(name, packages) {
      const selectedGame = this.gameList.findIndex((data) => data.name == name);
      this.gameList[selectedGame].package = packages;
    },
    onAddPayment(name, payment) {
      const selectedGame = this.gameList.findIndex((data) => data.name == name);
      console.log(payment);
      this.gameList[selectedGame].payment.push(payment);
    },
    onAddPackage(name, packages) {
      const selectedGame = this.gameList.findIndex((data) => data.name == name);
      this.gameList[selectedGame].package.push(packages);
    },
  },
  persist: {
    enabled: true,
  },
});

// import { defineStore } from "pinia";
// import axios from 'axios';
// export const useGameStore = defineStore("game", {
//   state: () => ({
//     onInit() {
//       console.log("string");
//       axios.get('http://localhost:3000/api/file/game', {
//       })
//         .then(function (response) {
//           gameList = response.result;
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//     },
//     gameList: [

//     ]
//   }),
//   actions: {
//     onDeleteGame(name) {
//       console.log(name);
//       this.gameList = this.gameList.filter((data) => data.name != name);
//     },
//     onCreateGame(payload) {
//       this.gameList.push(payload);
//     },
//     onDeletePayment(name, payment) {
//       const selectedGame = this.gameList.findIndex((data) => data.name == name);
//       this.gameList[selectedGame].payment = payment;
//     },
//     onDeletePackage(name, packages) {
//       const selectedGame = this.gameList.findIndex((data) => data.name == name);
//       this.gameList[selectedGame].package = packages;
//     },
//     onAddPayment(name, payment) {
//       const selectedGame = this.gameList.findIndex((data) => data.name == name);
//       console.log(payment);
//       this.gameList[selectedGame].payment.push(payment);
//     },
//     onAddPackage(name, packages) {
//       const selectedGame = this.gameList.findIndex((data) => data.name == name);
//       this.gameList[selectedGame].package.push(packages);
//     },
//   },
//   persist: {
//     enabled: true,
//   },
// });
