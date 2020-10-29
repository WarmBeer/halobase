<template>
  <v-app class="no-bg">
    <navbar/>
    <v-main>
      <v-sheet
          id="bg"
          color="secondary"
      ></v-sheet>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  components: {Navbar},
  data: () => ({
  }),
  mounted() {
    this.$dao.user.getToken();
  }
}
</script>

<style lang="scss">
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-color: #292728;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#bg {
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /*
  background: linear-gradient(140deg,rgba(9,48,125,.95),rgba(8,40,102,.95) 4%,rgba(4,20,44,.95)),url(https://halobase.net/assets/ringworld.jpg) no-repeat 50% fixed;
  background-size: 110%;
  filter: saturate(2);
  */
}

.bg-black-4 {
  background-color: rgba(0, 0, 0, .4);
}

.no-bg {
  background: transparent!important;
}

.opaque-2 {
  opacity: .2;
}

.select-css {
  cursor: pointer;
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  line-height: 1.3;
  padding: .5em 1.4em .5em .8em;
  box-sizing: border-box;
  margin: 0 auto;
  border-radius: .5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  background-image: url("~@/assets/arrow-down.svg");
  background-repeat: no-repeat, repeat;
  /* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
  background-position: right 0em top 50%, 0 0;
  /* icon size, then gradient */
  background-size: 1.1em auto, 100%;
  outline: none;
}

.v-card--reveal {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, .95), rgba(0, 0, 0, .95));
  overflow-y: auto;
}

.row.row-bottom {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
