<template>
  <v-container fluid :class="$vuetify.breakpoint.mdAndUp ? 'px-8' : 'px-4'">
    <v-row>
      <v-col
          cols="12"
      >
        <v-sheet
            max-width="800px"
            dark
            color="primary"
            class="mx-auto px-8 pb-6 overflow-hidden rounded-lg text-left"
        >
          <div
              class="py-6 text-h4 white--text font-weight-bold text-center"
          >
            Privacy Policy
          </div>
          <h3>Why do I have to login to Steam?</h3>
          <p>Steam is required to identify you when creating servers and fileshare
            items. It allows you to use the site without having to have a
            separate login. We also interface with Steam to detect whether you are in a lobby
            and to generate lobby join links.</p>
          <h3>Is it safe to sign in with Steam?</h3>
          <p>We don't handle your Steam login credentials at all, when you
            sign in you are redirected to Steams official website to login, note
            the url and signed website by Steam. Our system receive a token that is
            linked to this website which we use to authorise your activity on our website.
            We do not receive your username or password.</p>
          <h3>But are you tracking me?</h3>
          <p>We use standard implementation approaches for Google Tag Manager and
            Google Analytics. We do store IP requests which is used to
            uniquely identify users of the server list.</p>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
name: "Privacy"
}
</script>

<style scoped>

</style>