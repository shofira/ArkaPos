<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  margin: 0;
  padding: 0;
  color: #2c3e50;
  background-color: rgba(190, 195, 202, 0.3);
  font-family: "AirbnbCerealBook", sans-serif;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@font-face {
  font-family: "AirbnbCerealBook";
  font-style: normal;
  font-weight: normal;
  src: url('../src/assets/font/AirbnbCerealBook.woff');
}
</style>
