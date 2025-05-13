"use strict";

import { CONSTANTS } from "../../global/index";
const {
  SET_HISTORY_OPTION,
  SET_ADDED,
} = CONSTANTS;

export default {
  namespaced: true,
  state: {
    historyOption: "Vacantes",
    added: "",
  },
  getters: {
    getHistoryOption(state) {
      return state.historyOption;
    },
    getAdded(state) {
      return state.added;
    },
   
  },
  mutations: {
   
    [SET_HISTORY_OPTION](state, change) {
      state.historyOption = change;
    },
    [SET_ADDED](state, change) {
      state.added = change;
    },
  },
  actions: {
    setAdded({ commit }, payload) {
      commit(SET_ADDED, payload);
    },

    setHistoryOption({ commit }, payload) {
      commit(SET_HISTORY_OPTION, payload);
    },
  },
};
