<template>
  <div id="app">
    <b-container>
      <b-row id="nav">
        <b-col cols="6"> Lumière</b-col>
        <b-col cols="6">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </b-col>
        <router-view/>
      </b-row>
    </b-container>
  </div>
</template>

<style>

</style>
