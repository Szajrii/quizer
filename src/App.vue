<template>
  <router-view></router-view>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjBu38jVrvG18siQ7G2LDkT_brhprK9LI",
  authDomain: "quizer-2b2ff.firebaseapp.com",
  databaseURL: "https://quizer-2b2ff.firebaseio.com",
  projectId: "quizer-2b2ff",
  storageBucket: "quizer-2b2ff.appspot.com",
  messagingSenderId: "74901175341",
  appId: "1:74901175341:web:04d196a61a4e08d56e0ca4"
};
firebase.initializeApp(firebaseConfig);
export default {
  name: 'App',
  components: {
  },
  data: () => ({
    //
  }),
};
</script>
