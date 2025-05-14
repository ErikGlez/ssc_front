<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}

</script>

<style>

@import "./css/loaderSpinner.css";
@import "./css/optionContent.css";
@import "./css/search.css";
@import "./css/modal.css";
@import "./css/modalAdd.css";
*{
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  overflow: auto;
}

input:focus-visible, textarea:focus-visible, select:focus-visible {
  outline: none !important;
}

.center{
  display: flex;
  justify-content: center;
}

.mgs_error{
  background-color: rgb(204, 35, 35);
  width: fit-content;
  min-width: 20rem;
  color: white;
  margin: 1rem 0rem;
  box-sizing: border-box;
  padding: 0rem .5rem;
  font-weight: 300;
  font-size: 1rem;
}


 
</style>
