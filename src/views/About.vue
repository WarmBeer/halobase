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
            About Us
          </div>
          <h3>Halobase</h3>
          <p>
            Halobase is the only working Server Browser and Fileshare for Halo: The Master Chief Collection.
            Brought to you by Halobase and The Beer Keg.
          </p>
          <h3 id="contact">Contact</h3>
          <p>
            <v-row class="mx-0">Email: Halobase2020@gmail.com</v-row>
            <v-row class="mx-0">Discord: Warm Beer#3325</v-row>
          </p>
          <h3>Support Halobase</h3>
          <p>
            A huge thank you goes out to all the people that supported us either on The Beer Keg or Halobase!
            You guys are legends and without your help The Beer Keg and Halobase would not have existed.
            We continue on improving and expanding our platforms to give you the best Halo experience possible.
            But unfortunately ambition can cost a lot of $$$. To continue our work, we need financial help from the community.
            So please consider donating through Patreon. Donators also get a fancy Donator role on The Beer Keg Discord :).
            Thank you!
          </p>
          <v-btn
              href="https://www.patreon.com/beerkeg"
              color="accent"
              elevation="0"
          >
            DONATE WITH PATREON
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
name: "About"
}
</script>

<style scoped>

</style>