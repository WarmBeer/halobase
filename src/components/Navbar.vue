<template>
  <div>
    <v-app-bar
      app
      absolute
      elevation="0"
      class="hidden-sm-and-down"
      color="primary"
    >
      <logo/>
      <v-btn
          v-for="link in links"
          :key="link"
          :to="'/'+link"
          text
          class="custom-btn white--text mr-2"
      >
        {{ link }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
          v-if="!isLoggedIn"
          text
          color="green"
          class="white--text"
          :href="authLink"
      >
        Sign in with STEAM
        <v-icon
            right
            dark
        >
          mdi-steam
        </v-icon>
      </v-btn>

      <v-menu
          v-if="isLoggedIn"
      >
        <template v-slot:activator="{ on }">
          <div
              style="cursor: pointer"
              v-on="on"
          >
            <span
                class="subtitle-2"
                v-html="user.name"
                style="color: #f66003;"
            >
            </span>
            <v-avatar
                size="36px"
                class="ml-4"
            >
              <img
                  v-if="user.avatar"
                  alt="Avatar"
                  :src="user.avatar"
              >
            </v-avatar>
          </div>
        </template>

        <v-list>
          <v-list-item
              to="profile"
          >
            My Profile
            <v-icon
                right
                light
            >
              mdi-account-circle
            </v-icon>
          </v-list-item>
          <v-list-item
              @click="logout()"
          >
            Logout
            <v-icon
                right
                light
            >
              mdi-steam
            </v-icon>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-chip
          v-if="inGame"
          label
          small
          dark
          color="green"
          class="ml-2"
      >
        Game Found
      </v-chip>

    </v-app-bar>

    <v-app-bar
        class="hidden-md-and-up"
        color="primary"
        fixed
    >
      <v-toolbar-title
          class="mr-6 orange--text font-weight-bold"
          style="
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 1px transparent;
            letter-spacing: 1.6px"
      >
          <logo/>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu
          v-if="isLoggedIn"
      >
        <template v-slot:activator="{ on }">
          <div
              style="cursor: pointer"
              v-on="on"
          >
            <v-avatar
                size="36px"
                class="mr-2"
            >
              <img
                  v-if="user.avatar"
                  alt="Avatar"
                  :src="user.avatar"
              >
            </v-avatar>
          </div>
        </template>

        <v-list>
          <v-list-item
              to="profile"
          >
            My Profile
            <v-icon
                right
                light
            >
              mdi-account-circle
            </v-icon>
          </v-list-item>
          <v-list-item
              @click="logout()"
          >
            Logout
            <v-icon
                right
                light
            >
              mdi-steam
            </v-icon>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu>
        <template v-slot:activator="{ on }">
        <v-app-bar-nav-icon
            dark
            v-on="on"
        >
        </v-app-bar-nav-icon>
        </template>

        <v-list>
          <v-list-item
              v-for="link in links"
              :key="link"
              :to="'/'+link"
          >
            {{ link }}
          </v-list-item>
          <v-list-item
              v-if="!isLoggedIn"
              :href="authLink"
          >
            Sign in
            <v-icon
                right
                light
            >
              mdi-steam
            </v-icon>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import Logo from "@/components/Logo";
export default {
  name: "Navbar",
  components: {Logo},
  data: () => ({
    links: [
      'servers',
      'fileshare',
    ],
  }),
  methods: {
    logout() {
      this.$dao.user.logout();
    },
  },
  computed: {
    authLink() {
      return this.$dao.user.authLink();
    },
    user() {
      return this.$dao.user.user;
    },
    isLoggedIn() {
      return Object.keys(this.user).length > 0;
    },
    inGame() {
      return false;
    }
  },
}
</script>

<style scoped>
</style>