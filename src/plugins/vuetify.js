import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    visibility: "mid-watch"
  },
  theme: {
    themes: {
      light: {
          primary: "#3f51b5",
          secondary: "#9c27b0",
          accent: "#e91e63",
          error: "#f44336",
          warning: "#ffc107",
          info: "#00bcd4",
          success: "#4caf50"
      },
    },
  },
});
