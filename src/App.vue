<template>
  <router-view></router-view>
</template>

<script>
import {firebaseConfig} from "./firebase";
import * as firebase from "firebase/app";
import "firebase/auth";


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
