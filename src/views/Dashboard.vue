<template >
  <div id="dashboard">
    <Sidemenu/>
    
    <div id="content">
       <div class="header">
          <p>SSC</p>
          <svg data-icon-name="right-2" data-style="line" icon_origin_id="12070" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="right-2" class="icon line" width="48" height="48"><polyline style="fill: none; stroke:gray; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1;" points="7.5 3 16.5 12 7.5 21" id="primary"></polyline></svg>
          <p>{{ historyOption }}</p>
       </div>
        <Vacantes v-if="historyOption === 'Vacantes'"/>
        <Contrataciones v-if="historyOption === 'Contrataciones'"/>
    </div>

  </div>
</template>
<script>

import Sidemenu from '@/components/sidemenu.vue';
import Vacantes from './Vacantes.vue';
import Contrataciones from './Contrataciones.vue';
export default {
  name: "Dashboard",
  components: {
    Sidemenu,
    Vacantes,
    Contrataciones
  },
  computed: {
    historyOption() {
      const data = this.$store.getters['main/getHistoryOption'];
      return data;
    },
  },

};
</script>
<style >
  #dashboard {
    display: flex;
    background-color: #F5F5F5;
    height: 100vh;
    width: 100%;
    overflow: auto;
  }
  #content{
    width: 100%;
  }
  .header{
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #ccc;
    width: 100%;
    box-sizing: border-box;
  }

  .header p:first-child{
    color: #272727;

  }

  .header p:last-child{
    color: #272727;
    font-weight: 600;
  }

  .header svg{
    width: .8rem;
    margin: 0rem .5rem;
  }
</style>