<template>
  <div id="app">
    <NavBar />
    <Footer />
  </div>
</template>

<script>
    import NavBar from '@/components/NavBar.vue';
    import Footer from '@/components/Footer.vue';
    
    export default {
      components: {
        NavBar,
        Footer,
      },
    }
</script>

<style>

@font-face {
  font-family: 'News Cycle';
  font-weight: 400;
  src: local('News Cycle');

}

@font-face {
  font-family: 'News Cycle-Bold';
  font-weight: 700;
  src: local('News Cycle');
  
}

@font-face {
  font-family: 'Meow_Script';
  src: url('./assets/font/Meow_Script/MeowScript-Regular.ttf') format('truetype');
  font-weight: normal;
}

:root {
  --cor0: #010402;
  --cor1: #1C2C54;
  --cor2: #FADA5E;
  --cor3: #4BC3B5;
  --cor4: #CDF0E5;
  --font0: 'League Spartan';
  --font1: 'News Cycle';
  --font2: 'News Cycle-Bold';
  --font3: 'Meow_Script';
}

* {
  margin: 0px;
  padding: 0px;
}

#app {
  min-height: 100vh;
  background-image: linear-gradient(to bottom,var(--cor0), #317e75);
  /* background-color: #010402; */
  color: white;
}
</style>
