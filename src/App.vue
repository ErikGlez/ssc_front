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



 
</style>
