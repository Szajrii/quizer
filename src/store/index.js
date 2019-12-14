import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: null,
    multipleChoices: false,
    answers: []
  },
  mutations: {
    setAnswer(state, payload) {
        state.answers.push(payload);
    }
  },
  actions: {
  },
  modules: {
  }
})
