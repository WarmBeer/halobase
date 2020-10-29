<template>
  <v-container>
    <v-row
        v-for="(item, i) in 1"
        :key="i"
        :item="item"
        class="mx-0 my-8"
    >
      <v-card
          dark
          width="100%"
          color="rgba(255, 255, 255, .1)"
      >
        <v-card-title>
          Test titel
        </v-card-title>
        <v-card-subtitle>
          <v-row
              class="mx-0"
          >
            Written by: Warm Beer
          </v-row>
          <v-row
              class="mx-0"
          >
            Placed: 2 Hours Ago
          </v-row>
        </v-card-subtitle>
        <v-card-text>
          Welcome to the new Halobase!
        </v-card-text>
        <v-card-actions>
          <v-row
              justify="end"
              class="mx-0"
          >
            <v-btn
                dark
                color="blue"
            >
              Read More
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
name: "Dashboard"
}
</script>

<style scoped>

</style>