<template>
  <div id="app">
    <NavBar />
  </div>
</template>

<script>
    import NavBar from '@/components/NavBar.vue';
    export default {
      components: {
        NavBar,
      },
    }
</script>

<style>
@font-face {
  font-family: 'Spartan';
  src: url('./assets/font/Spartan/static/Spartan-ExtraBold.ttf') format('truetype');
}

@font-face {
  font-family: 'News Cycle';
  src: url('./assets/font/news cycle/NewsCycle-Regular.ttf') format('truetype')
}

@font-face {
  font-family: 'News Cycle-Bold';
  src: url('./assets/font/news cycle/NewsCycle-Bold.ttf') format('truetype');
}

@font-face {
  font-family: 'Meow_Script';
  src: url('./assets/font/Meow_Script/MeowScript-Regular.ttf') format('truetype');
}

:root {
  --cor0: #010402;
  --cor1: #1C2C54;
  --cor2: #FADA5E;
  --cor3: #4BC3B5;
  --cor4: #CDF0E5;
  --font0: 'Spartan';
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
  background-color: #010402;
  color: white;
}
</style>
