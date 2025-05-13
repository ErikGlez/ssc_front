
<template>
  <div id="sidemenu">
    <div class="logo">
        <svg data-icon-name="star" data-style="line" icon_origin_id="22137" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="star" class="icon line" width="48" height="48"><polygon style="fill: none; stroke: #fff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1;" points="12 4 9.22 9.27 3 10.11 7.5 14.21 6.44 20 12 17.27 17.56 20 16.5 14.21 21 10.11 14.78 9.27 12 4" id="primary"></polygon></svg>      
        <p>SSC</p>
    </div>

    <div class="options">
        <p v-for="(item, index) in listOptions" :key="index" :class="{'active': historyOption===item}" @click="setOption(item)">{{ item }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      listOptions: [
       'Vacantes',
       'Contrataciones',
      ],
    }
  },
  created() {
    const data = localStorage.getItem('LSHistoryOption');
    if (data && data !== this.historyOption) {
      this.setHistoryOption(data);
    }
  },
  computed: {
    historyOption() {
      const data = this.$store.getters['main/getHistoryOption'];
      return data;
    },
  },
  methods: {
    ...mapActions('main', ['setHistoryOption']),
    setOption(option) {
      this.setHistoryOption(option);
      localStorage.setItem('LSHistoryOption', option);
    },

  },

}

</script>

<style>
  #sidemenu {
    background-color: #3B66A3;
    width: 15rem;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
  }

  .logo {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .logo svg {
    width: 2rem;
  }

  .logo p {
    color: #fff;
    font-size: 1.5rem;
    font-weight: 600;
    margin-left: 1rem;
  }

  .options{
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
  }

  .options p{
    color: #fff;
    font-size: .8rem;
    font-weight: 400;
    height: 2rem;
    display: flex;
    align-items: center;
    padding-left: .5rem;
    border-radius: .5rem;
    cursor: pointer;
    margin-bottom: 2px;
  }

  .options p.active{
    background-color: #32578B;
  }

  .options p:hover{
    background-color: #345f9b;
  }
  
</style>
