<template>
  <div class="optionContent">

    <div style="display: flex; align-items: center;">
      <button class="btnAdd">
          Añadir vacante
      </button>

      <div class="search">
        <svg data-icon-name="search-alt-2" data-style="line" icon_origin_id="20595" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="search-alt-2" class="icon line" width="48" height="48"><path style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 1;" d="M19,11a8,8,0,1,1-8-8A8,8,0,0,1,19,11Zm2,10-4.34-4.34" id="primary"></path></svg>
        <input v-model="search_value" type="text" placeholder="Buscar por nombre">
      </div>
    </div>

    <div class="tableContent">
        <div class="headerTable">
            <p class="lrg">Nombre</p>
            <p class="lrg">Correo</p>
            <p class="lrg">Número de teléfono</p>
            <p class="md">Estado</p>
            <p class="md">Foto de perfil</p>
            <p class="md">Creada</p>
            <p class="op"> Editar </p>
            <p class="op"> Eliminar</p>
        </div>
        <div class="tableBody">
            <div class="tableRow" v-for="(item, index) in listContrataciones" :key="index">
                 <p class="lrg">{{ item.fields.Nombre }}</p>
                  <p class="lrg"> {{ item.fields.Correo }}</p>
                  <p class="lrg"> {{ item.fields['Número de teléfono'] }}</p>
                  <p class="md">
                    <span class="optionBg" :class="{ 
                      'bg-2': item.fields.Estado === 'Completada',
                      'bg-3': item.fields.Estado === 'Pendiente',
                      'bg-5': item.fields.Estado === 'En Proceso', 'color-wh': item.fields.Estado === 'Pendiente' ||  item.fields.Estado === 'Completada',}"  > {{ item.fields.Estado }}</span>
                  </p>
                  <p class="md" ><img :src="`${ item.fields['Foto de perfil'][0].thumbnails.small.url }`" @click="viewModalFoto=true, urlFoto = item.fields['Foto de perfil'][0].thumbnails.full.url " alt="Foto de perfil" style="cursor: pointer;"></p>
                  <p class="md">{{ item.fields.Creada | formatDate }}</p>
              
                <p class="op"><svg data-icon-name="edit-alt" data-style="line" icon_origin_id="20455" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="edit-alt" class="icon line" width="48" height="48"><path style="fill: none; stroke: blue; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1;" d="M20.41,7.83,7.24,21H3V16.76L16.17,3.59a1,1,0,0,1,1.42,0l2.82,2.82A1,1,0,0,1,20.41,7.83Z" id="primary"></path></svg></p>
                <p class="op"><svg @click="viewModal=true, itemSel = item" data-icon-name="delete-alt" data-style="line" icon_origin_id="20441" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="delete-alt" class="icon line" width="48" height="48"><path style="fill: none; stroke: red; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1;" d="M4,7H20M16,7V4a1,1,0,0,0-1-1H9A1,1,0,0,0,8,4V7M18,20V7H6V20a1,1,0,0,0,1,1H17A1,1,0,0,0,18,20Zm-8-9v6m4-6v6" id="primary"></path></svg></p>
            </div>
        </div> 
    </div>

    <div v-if="regLoading" class="loaderView">
        <div>
            <div class="loaderSpinner"></div>
            <p class="process">{{ process }}</p>
        </div>
    </div>


    <div v-if="viewModal" class="modalView">
        <div class="modalContent">
            <div class="body">
                <div class="center">
                  <img src="../assets/alert.png" alt="icono alerta">
                </div>
                <h3>¿Estás seguro de <span>eliminar <br> este registro?</span></h3>
            </div>
            <div class="modalBtns">
                <p @click="remove()">Aceptar</p>
                <p @click="viewModal = false, itemSel = null">Cancelar</p>
            </div>
        </div>
    </div>

    <div v-if="viewModalFoto" class="modalView" @click="urlFoto = '', viewModalFoto= false">
            <img style="height: 25rem;" :src="`${urlFoto}`" alt="">
    </div>
   

  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { formatCurrency, includesValue } from '@/helpers';
import dayjs from 'dayjs';
export default {
  name: 'Contrataciones',
  data(){
    return {
        search_value: '',
        regLoading: false,
        process: "",
        viewModal:false,
        viewModalFoto: false,
        urlFoto: '',
        itemSel: null,
        formatCurrency,
        includesValue
    }
  },
  async created(){
    await this.updateInfo() 
  },
  computed:{
    listContrataciones(){
        const data = this.$store.getters["contrataciones/data"];
        if (!Array.isArray(data)) return []
        if (this.search_value !== '') {
            return data.filter(item => this.includesValue(this.search_value, item.fields.Nombre))
        }
        return data
    }
  },
  methods:{
    ...mapActions('contrataciones', ['getAllInfo', 'deleteItem']),
    async updateInfo(){
        this.regLoading = true
        this.process = 'Obteniendo contrataciones'
        await this.getAllInfo('Contrataciones')
        this.regLoading = false
        this.process = ''
    },
    
    async remove(){
      this.viewModal = false
      this.regLoading = true
      this.process = 'Eliminando vacante'

      await this.deleteItem({
        id: this.itemSel.id,
        table_name:'Contrataciones'
      })

      this.itemSel = null
      this.process = 'Obteniendo contrataciones'
      await this.updateInfo() 
      this.regLoading = false
      this.process = ''
    }
  },

  filters:{
    formatDate(date){
      return dayjs(date).format('DD/M/YYYY')
    }
  }
}

</script>