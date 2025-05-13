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

*{
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}

input:focus-visible {
  outline: none !important;
}

.center{
  display: flex;
  justify-content: center;
}



 
</style>
