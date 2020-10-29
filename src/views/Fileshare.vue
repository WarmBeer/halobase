<template>
  <v-container>
    <v-row>
      <v-col
          cols="12"
          sm="auto"
      >
        <v-toolbar-title
            class="text-h6 white--text font-weight-bold"
        >
          ALL FILES
        </v-toolbar-title>
      </v-col>
      <v-col
          cols="12"
          sm="5"
          md="3"
      >
        <v-text-field
            v-model="filters.search"
            dark
            background-color="rgba(255, 255, 255, 0.1)"
            placeholder="Search files.."
            dense
            flat
            hide-details
            rounded
            solo
            @keydown.enter="updateFilters()"
            append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>

      <!-- START FILTER MENU -->
      <v-col
          cols="12"
          sm="auto"
      >
        <div class="text-center">
          <v-menu
              :close-on-content-click="false"
              :nudge-width="200"
              offset-x
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  rounded
                  :color="filters.type || filters.game || filters.search ? 'blue' : 'white'"
                  :class="filters.type || filters.game || filters.search ? 'white--text' : 'black--text'"
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon
                    right
                    dark
                    class="mx-0"
                >
                  mdi-tune
                </v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-list>
                <v-list-item>
                  <v-row>
                    <v-col
                        cols="12"
                        sm="4"
                    >
                      <div class="select-title">
                        Type
                      </div>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="8"
                    >
                      <select
                          v-model="filters.type"
                          class="select-filter"
                          @change="updateFilters()"
                      >
                        <option value="">Any</option>
                        <option value="Mod">Mod</option>
                        <option value="Map">Map</option>
                      </select>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row>
                    <v-col
                        cols="12"
                        sm="4"
                    >
                      <div class="select-title">
                        Game
                      </div>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="8"
                    >
                      <select
                          v-model="filters.game"
                          class="select-filter"
                          @change="updateFilters()"
                      >
                        <option value="">Any</option>
                        <option value="Halo: CE">Halo: CE</option>
                        <option value="Halo 2">Halo 2</option>
                        <option value="Halo 3">Halo 3</option>
                        <option value="Halo 3: ODST">Halo 3: ODST</option>
                        <option value="Halo: Reach">Halo: Reach</option>
                        <option value="Halo 4">Halo 4</option>
                      </select>
                    </v-col>
                  </v-row>
                </v-list-item>
              </v-list>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    @click="resetFilters()"
                >
                  Reset Filters
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>
      </v-col>
      <!-- END FILTER MENU -->

      <v-spacer></v-spacer>
      <v-col
          cols="12"
          sm="auto"
      >
        <select
            v-model="sorting"
            class="select-css"
            @change="updateSorting()"
        >
          <option value="downloads">Most Downloaded</option>
          <option value="updated">Last Updated</option>
          <option value="uploaded">Last Added</option>
          <option value="views">Most Viewed</option>
        </select>
      </v-col>
      <v-col
          cols="12"
          sm="auto"
      >
        <v-btn
            elevation="2"
            color="accent"
            class="text-caption font-weight-bold"
        >
          Upload File
          <v-icon
              right
          >
            mdi-upload
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- START FILE CARDS -->
    <v-row>
      <v-col
          v-for="(file, i) in files"
          :key="i"
          cols="12"
          xs="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
      >
          <v-card
              color="primary"
              flat
              style="cursor: pointer"
              class="rounded-lg"
          >
            <v-hover v-slot:default="{ hover }">
              <v-img
                  :aspect-ratio="16/10"
                  :src="file.images.thumb"
                  class="black rounded-lg"
              >
                <v-fade-transition>
                  <div
                      v-if="hover"
                      class="pa-4 d-flex v-card--reveal subtitle-2 white--text">
                    {{ file.description.short }}
                  </div>
                </v-fade-transition>
                <v-row
                    v-if="!hover"
                    class="mx-1 py-1"
                >
                  <v-spacer></v-spacer>
                  <v-chip
                      small
                      dark
                      label
                      class="mr-1 white--text"
                      color="secondary"
                  >
                    {{ file.views }}
                    <v-icon
                        small
                        class="mx-1"
                    >
                      mdi-eye
                    </v-icon>
                  </v-chip>
                  <v-chip
                      small
                      dark
                      label
                      class="white--text float-left"
                      color="secondary"
                  >
                    {{ file.downloads }}
                    <v-icon
                        small
                    >
                      mdi-download
                    </v-icon>
                  </v-chip>
                </v-row>
              </v-img>
            </v-hover>
            <!-- CARD TAGS
            <v-row
                class="mx-0 py-2"
            >
              <v-chip
                  color="rgba(255, 255, 255, .1)"
                  class="white--text"
                  label
                  small
                  @click="filters.type = file.type;updateFilters()"
              >
                {{ file.type }}
              </v-chip>
              <v-chip
                  color="rgba(255, 255, 255, .1)"
                  class="ml-2 white--text"
                  label
                  small
                  @click="filters.game = file.game;updateFilters()"
              >
                {{ file.game }}
              </v-chip>
            </v-row>
            -->
            <v-card-title
                class="subtitle-2 px-2 pb-0 pt-1 white--text text-truncate"
            >
              {{ file.name }}
            </v-card-title>
            <v-card-actions
                class="pa-0"
            >
              <v-list-item
                  class="px-2"
              >
                <v-list-item-avatar
                    color="white"
                    size="28"
                    class="mr-2"
                >
                  <v-img
                      v-if="file.author.avatar"
                      class="elevation-6"
                      alt=""
                      :src="file.author.avatar"
                  ></v-img>
                  <v-icon
                      v-else
                  >
                    mdi-account
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="caption grey--text text-left">{{ file.author.name }}</v-list-item-title>
                </v-list-item-content>

                <v-row
                    align="center"
                    justify="end"
                    class="mx-0"
                >
                  <v-hover v-slot:default="{ hover }">
                    <v-icon
                        class="mr-1"
                        :color="hover ? 'red' : 'rgba(255, 255, 255, .1)'"
                    >
                      mdi-heart
                    </v-icon>
                  </v-hover>
                  <span class="subheading white--text">{{ file.likes || 0 }}</span>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
      </v-col>
    </v-row>
    <v-row
        v-if="$dao.fileshare.totalFiles > $dao.fileshare.files.length"
        class="py-12"
        justify="center"
    >
      <v-btn
          light
          color="white"
          elevation="2"
          @click="getMoreFiles()"
      >
        Show More Files
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Fileshare",
  data: () => ({
    sorting: 'downloads',
    select: { state: 'Florida', abbr: 'FL' },
    filters: {
      type: '',
      game: '',
      search: ''
    },
  }),
  methods: {
    getFiles() {
      this.$dao.fileshare.getFiles();
    },
    getMoreFiles() {
      this.$dao.fileshare.getMoreFiles();
    },
    updateSorting() {
      this.$dao.fileshare.sorting = this.sorting;
      this.getFiles();
    },
    updateFilters() {
      this.$dao.fileshare.filters = this.filters;
      this.getFiles();
    },
    resetFilters() {
      this.filters = {
        type: '',
        game: '',
        search: ''
      }
      this.updateFilters();
    }
  },
  computed: {
    files() {
      return this.$dao.fileshare.files;
    }
  },
  mounted() {
    this.sorting = this.$dao.fileshare.sorting;
    this.filters = this.$dao.fileshare.filters;
    this.getFiles();
  }
}
</script>

<style scoped>
  .select-title {
    padding: .3em 0em;
  }

  .select-filter {
    width: 100%;
    padding: .3em 1em;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, .1);
  }
</style>