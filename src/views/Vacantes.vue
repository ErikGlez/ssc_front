<template>
  <div class="optionContent">

    <div style="display: flex; align-items: center;">
      <button class="btnAdd" @click="viewModalAdd=true">
          Añadir vacante
      </button>

      <div class="search">
        <svg data-icon-name="search-alt-2" data-style="line" icon_origin_id="20595" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="search-alt-2" class="icon line" width="48" height="48"><path style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 1;" d="M19,11a8,8,0,1,1-8-8A8,8,0,0,1,19,11Zm2,10-4.34-4.34" id="primary"></path></svg>
        <input v-model="search_value" type="text" placeholder="Buscar por puesto">
      </div>
    </div>

    <div class="tableContent">
        <div class="headerTable">
            <p class="lrg">Puesto</p>
            <p class="md">Descripcion</p>
            <p class="md">Salario</p>
            <p class="md">Departamento</p>
            <p class="op"> Editar </p>
            <p class="op"> Eliminar</p>
        </div>
        <div class="tableBody">
            <div class="tableRow" v-for="(item, index) in listVacantes" :key="index">
                <p class="lrg">{{item.fields.Puesto}}</p>
                <p class="md">{{item.fields.Descripcion}}</p>
                <p class="md">${{formatCurrency(item.fields.Salario)}}</p>
                <p class="md"><span class="optionBg" :class="{ 
                      'bg-1': item.fields.Departamento === 'Diseño',
                      'bg-2': item.fields.Departamento === 'Desarrollo',
                      'bg-3': item.fields.Departamento === 'Social Media',
                      'bg-4': item.fields.Departamento === 'Otro', 'color-wh': item.fields.Departamento !== 'Otro', }" > {{item.fields.Departamento}}</span></p>
                <p class="op"><svg @click="viewModalEdit=true, setValues(item)" data-icon-name="edit-alt" data-style="line" icon_origin_id="20455" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="edit-alt" class="icon line" width="48" height="48"><path style="fill: none; stroke: blue; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1;" d="M20.41,7.83,7.24,21H3V16.76L16.17,3.59a1,1,0,0,1,1.42,0l2.82,2.82A1,1,0,0,1,20.41,7.83Z" id="primary"></path></svg></p>
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


    <div v-if="viewModalAdd" class="modalView">
        <div class="modalAdd">
          <form @submit.prevent="createItem(Puesto, Descripcion, Salario, Departamento)">
            <div class="close" @click="clearValues(), viewModalAdd=false">
            <svg data-icon-name="cross" data-style="line" icon_origin_id="20398" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="cross" class="icon line" width="48" height="48"><line style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 1;" y2="5" x2="5" y1="19" x1="19" id="primary"></line><line style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 1;" y2="19" x2="5" y1="5" x1="19" data-name="primary" id="primary-2"></line></svg>
          </div>
          <div class="modalAddBody">
            <h2>Nueva vacante</h2>

            <div class="grpForm">
              <label for="Puesto">Puesto</label>
              <input type="text" v-model="Puesto" required>
            </div>
           <div class="grpForm">
              <label for="Descripcion">Descripción</label>
              <textarea type="text" v-model="Descripcion" required> </textarea>
            </div>
         <div class="grpForm">
              <label for="Salario">Salario</label>
            <input type="number" v-model="Salario" required>
            </div>
             <div class="grpForm">
              <label for="Departamento">Departamento</label>
              <select v-model="Departamento" name="Departamento" id="Departamento" required>
                <option :value="item" v-for="(item, index) in listDepartamentos" :key="index">{{ item }}</option>
              </select>
            </div>
 
          </div>
          <div class="modalAddFooter" >
            <p @click="clearValues()">Borrar formulario</p>
            <button class="btnAdd" type="submit">
              Crear
            </button>
          </div>
          </form>
        </div>
    </div>

    <div v-if="viewModalEdit" class="modalView">
        <div class="modalAdd">
          <form @submit.prevent="updateItem(Puesto, Descripcion, Salario, Departamento)">
            <div class="close"  @click="clearValues(), viewModalEdit=false">
            <svg data-icon-name="cross" data-style="line" icon_origin_id="20398" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="cross" class="icon line" width="48" height="48"><line style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 1;" y2="5" x2="5" y1="19" x1="19" id="primary"></line><line style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 1;" y2="19" x2="5" y1="5" x1="19" data-name="primary" id="primary-2"></line></svg>
          </div>
          <div class="modalAddBody">
            <h2>Actualizar vacante</h2>

            <div class="grpForm">
              <label for="Puesto">Puesto</label>
              <input type="text" v-model="Puesto" required>
            </div>
           <div class="grpForm">
              <label for="Descripcion">Descripción</label>
              <textarea type="text" v-model="Descripcion" required> </textarea>
            </div>
         <div class="grpForm">
              <label for="Salario">Salario</label>
            <input type="number" v-model="Salario" required>
            </div>
             <div class="grpForm">
              <label for="Departamento">Departamento</label>
              <select v-model="Departamento" name="Departamento" id="Departamento" required>
                <option :value="item" v-for="(item, index) in listDepartamentos" :key="index">{{ item }}</option>
              </select>
            </div>
 
          </div>
          <div class="modalAddFooter" >
            <p @click="clearValues(), viewModalEdit=false">Cancelar</p>
            <button class="btnAdd" type="submit">
              Actualizar
            </button>
          </div>
          </form>
        </div>
    </div>

     <div class="mgs_error" v-if="message">
      <p>{{ message }}</p>
    </div>
   
    
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { formatCurrency, includesValue } from '@/helpers';
export default {
  name: 'Vacantes',
  data(){
    return {
        search_value: '',
        regLoading: false,
        process: "",
        viewModal:false,
        viewModalAdd:false,
        viewModalEdit:false,
        itemSel: null,
        formatCurrency,
        includesValue,

        message:'',
        id: '',
        Puesto:'',
        Descripcion:'',
        Salario:'',
        Departamento:'',
        listDepartamentos: [
          'Diseño',
          'Desarrollo',
          'Social Media',
          'Otro'
        ],


    }
  },
  async created(){
    await this.updateInfo() 
  },
  computed:{
    listVacantes(){
        let data = this.$store.getters["vacantes/data"];
        if (!Array.isArray(data)) return []
         data = data.sort((a, b) =>  new Date(b.createdTime) - new Date(a.createdTime)  )
        if (this.search_value !== '') {
            return data.filter(item => this.includesValue(this.search_value, item.fields.Puesto))
        }
        return data
    }
  },
  methods:{
    ...mapActions('vacantes', ['getAllInfoVacantes', 'deleteItem', 'addItem' , 'editItem']),
    setValues(item){
      const data = structuredClone(item)
      this.id = data.id
      this.Puesto =  data.fields.Puesto
      this.Salario =  data.fields.Salario
      this.Descripcion =  data.fields.Descripcion
      this.Departamento =  data.fields.Departamento
    },
    async updateInfo(){
        this.regLoading = true
        this.process = 'Obteniendo vacantes'
        await this.getAllInfoVacantes('Vacantes')
        this.regLoading = false
        this.process = ''
    },

    clearValues(){
      this.Puesto = ''
      this.Descripcion = ''
      this.Salario = ''
      this.Departamento = ''
      this.itemSel = null
      this.id = ''
    },

    clearError: function () {
        setTimeout(() => this.message = '', 2000);
    },

    async createItem(Puesto, Descripcion, Salario, Departamento){
      this.viewModalAdd = false
      this.regLoading = true
      this.process = 'Creando vacante'

      const response = await this.addItem({
        data: { Puesto, Descripcion, Salario: parseFloat(Salario), Departamento },
        table_name: 'Vacantes'
      })
      this.clearValues()

      this.process = 'Obteniendo vacantes'
      await this.updateInfo() 
      this.regLoading = false
      this.process = ''
       if(!response?.id){
        this.message = "Ha ocurrido un error al intentar agregar la vacante."
        this.clearError()
      }

    },

    async updateItem(Puesto, Descripcion, Salario, Departamento){
        this.viewModalEdit = false
        this.regLoading = true
        this.process = 'Actualizando vacante'

        await this.editItem({
          id: this.id,
          data: { Puesto, Descripcion, Salario: parseFloat(Salario), Departamento },
          table_name: 'Vacantes'
        })
        this.clearValues()

        this.process = 'Obteniendo vacantes'
        await this.updateInfo() 
        this.regLoading = false
        this.process = ''

      },
    async remove(){
      this.viewModal = false
      this.regLoading = true
      this.process = 'Eliminando vacante'

      await this.deleteItem({
        id: this.itemSel.id,
        table_name:'Vacantes'
      })

      this.itemSel = null
      this.process = 'Obteniendo vacantes'
      await this.updateInfo() 
      this.regLoading = false
      this.process = ''
    }
  }
}

</script>

<style>



</style>