import Vue from 'vue'
import Vuex from 'vuex'
import vacantes from './modules/vacantes'
import main from './modules/main'
import contrataciones from './modules/contrataciones'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    vacantes,
    contrataciones,
    main
  }
})
