<template>
  <v-footer
      color="primary"
      elevation="0"
      class="px-4"
  >
    <v-card
        class="flex"
        color="primary"
        flat
        tile
    >

      <!--
      :class="$vuetify.breakpoint.mdAndUp ? 'px-4' : ''"
      <v-row class="mx-2 py-8" :class="$vuetify.breakpoint.mdAndUp ? 'mx-8' : ''">
        <v-col
            cols="12"
            :md="12/(sections.length+2)"
            class="px-2 text-left"
        >
          <logo/>
          <p
              class="pt-4 subtitle-2"
          >
            HaloBase is the only working Server Browser and Fileshare for Halo: The Master Chief Collection.
            Brought to you by HaloBase and The Beer Keg.
          </p>
        </v-col>
        <v-col
            v-for="(section, index) in sections"
            :key="index"
            cols="6"
            :md="12/(sections.length+2)"
            class="px-2 text-left"
        >
          <div
              class="mb-4 subtitle-2 font-weight-bold orangekeg--text"
          >
            {{ section.title }}
          </div>
          <a
              v-for="(link, index) in section.links"
              :key="index"
              :href="link.url"
              class="py-0 subtitle-2 d-block white--text text-left font-weight-regular text-decoration-none"
              style="width: 100%"
          >
            {{ link.title }}
          </a>
        </v-col>
        <v-col
            cols="12"
            :md="12/(sections.length+2)"
            class="px-2 text-left"
        >
          <div
              class="mb-4 subtitle-2 font-weight-bold orangekeg--text"
          >
            SUPPORT HALOBASE
          </div>
          <p
              class=" subtitle-2"
          >
            Thank you so much for supporting us! With your support we can focus on developing new features for HaloBase and other Halo related projects.
          </p>
          <v-btn
              href="https://www.patreon.com/beerkeg"
              color="accent"
              elevation="0"
          >
            DONATE WITH PATREON
          </v-btn>
        </v-col>
      </v-row>

      <v-divider class="mx-2" :class="$vuetify.breakpoint.mdAndUp ? 'mx-8' : ''"/>
      -->

      <v-row
          class="mx-0 px-1"
      >
        <v-col
            cols="12"
            md="auto"
        >
          <div
              style="color: rgba(255,255,255,.85);height: 28px;line-height: 28px;text-align: center"
              class="caption"
          >
            Copyright © {{ new Date().getFullYear() }} Halobase & The Beer Keg. Halo © Microsoft Corporation.
          </div>
        </v-col>
        <v-col
            cols="12"
            md="auto"
        >
          <v-btn
              small
              dark
              color="#e64413"
              href="https://www.patreon.com/beerkeg"
          >
            Support with Patreon
            <v-icon
                small
                class="ml-2"
            >
              mdi-patreon
            </v-icon>
          </v-btn>
        </v-col>
        <v-col
            cols="12"
            md="auto"
        >
          <v-btn
              small
              dark
              color="indigo lighten-1"
              href="https://discord.gg/WnZqJef"
          >
            Join us on Discord
            <v-icon
                small
                class="ml-2"
            >
              mdi-discord
            </v-icon>
          </v-btn>
        </v-col>
        <v-spacer/>
        <v-col
            cols="12"
            md="auto"
        >
          <v-btn
              text
              small
              dark
              color="blue"
              :to="'/about'"
          >
            About Us
          </v-btn>
        </v-col>
        <v-col
            cols="12"
            md="auto"
        >
          <v-btn
              text
              small
              dark
              color="blue"
              :to="'/privacy'"
          >
            Privacy Policy
          </v-btn>
        </v-col>
        <v-col
            cols="12"
            md="auto"
        >
          <v-btn
              text
              small
              dark
              color="blue"
              :to="'/terms'"
          >
            Terms of Service
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-footer>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import Logo from "@/components/Logo";
export default {
  name: 'Footer',
  components: {Logo},
  data: () => ({
    sections: [
      {
        title: 'RELATED SITES',
        links: [
          { title: 'ElDewrito', url: 'https://eldewrito.com' },
          { title: 'The Beer Keg', url: 'http://thebeerkeg.net' },
          { title: 'Halo Crea', url: 'https://forge.halocrea.com' },
          { title: 'Halo Waypoint', url: 'https://www.halowaypoint.com/en-gb' },
        ]
      },
      {
        title: 'SOCIAL',
        links: [
          { title: 'Patreon', url: 'https://www.patreon.com/beerkeg' },
          { title: 'Discord', url: 'https://discord.gg/WnZqJef' },
          { title: 'Twitter', url: 'https://twitter.com/Halobasenet' },
          { title: 'Reddit', url: 'https://www.reddit.com/r/HaloBase' }
        ]
      },
      {
        title: 'DISCORDS',
        links: [
          { title: 'HaloBase (US LFG)', url: 'https://discord.gg/WnZqJef' },
          { title: 'The Beer Keg (EU/US LFG)', url: 'https://discord.gg/MvmbKrS' },
          { title: 'HaloMods (Modding)', url: 'https://discord.gg/npE54Xa' }
        ]
      },
      {
        title: 'HELP & CONTACT',
        links: [
          { title: 'Help', url: '' },
          { title: 'Contact us', url: '' },
          { title: 'Volunteer', url: '' }
        ]
      }
    ]
  }),
}
</script>

<style scoped>

</style>