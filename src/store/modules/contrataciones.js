"use strict";


import airtableService from "../../services/airtable.service";
import { CONSTANTS, getErrorMessage } from "../../global/index";
const {
  GETTING_INFO,
  GET_INFO_SUCCESS,
  SET_HISTORY_OPTION,
  SET_ADDED,
  SET_STATUS,
  ERROR_MSG,
  ERROR_STATUS,
  CLEAN_VALUE,
} = CONSTANTS;

const ERROR_OBJ = {
  success: false,
  status: ERROR_STATUS,
  code: 500,
  message: ERROR_MSG,
  data: null
};
export default {
  namespaced: true,
  state: {
    loading: false,
    data: [],
    historyOption: "default",
    status: "",
    added: "",
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    data(state) {
      return state.data;
    },
    getHistoryOption(state) {
      return state.historyOption;
    },
    getAdded(state) {
      return state.added;
    },
    status(state) {
      return state.status;
    },
  },
  mutations: {
    [GETTING_INFO](state) {
      state.loading = true;
      state.data = [];
    },
    [GET_INFO_SUCCESS](state, change) {
      state.loading = false;
      state.data = change;
    },
    [SET_HISTORY_OPTION](state, change) {
      state.historyOption = change;
    },
    [SET_ADDED](state, change) {
      state.added = change;
    },
    [SET_STATUS](state, value) {
      state.status = value;
    },
    [CLEAN_VALUE](state, value) {
      state.data = value;
    },
  },
  actions: {
    setAdded({ commit }, payload) {
      commit(SET_ADDED, payload);
    },

    setHistoryOption({ commit }, payload) {
      commit(SET_HISTORY_OPTION, payload);
    },

    async getAllInfo({ commit }, payload) {
      commit(GETTING_INFO);

      try {
        const response = await airtableService.getRecords(payload);
        commit(GET_INFO_SUCCESS, response);
        return response;
      } catch (error) {
        if(!error?.response?.data?.message) return  ERROR_OBJ;
        return getErrorMessage(error.response.data.message)
      }
    },

    

    async deleteItem({ commit }, payload) {
      try {
        const response = await airtableService.deleteRecord(payload);
        return response
      } catch (error) {
        if(!error?.response?.data?.message) return  ERROR_OBJ;
        return getErrorMessage(error.response.data.message)
      }
    },

    async editItem({ commit }, payload) {
      commit(SET_STATUS, "SUCCESS");

      try {
        const response = await airtableService.updateRecord(payload);
        return response
      } catch (error) {
        if(!error?.response?.data?.message) return  ERROR_OBJ;
        return getErrorMessage(error.response.data.message)
      }
    },

    async addItem({ commit }, payload) {
      commit(SET_STATUS, "SUCCESS");

      try {
         const response = await airtableService.createRecord(payload);
        return response
      } catch (error) {
        if(!error?.response?.data?.message) return  ERROR_OBJ;
        return getErrorMessage(error.response.data.message)
      }
    },
  },
};
