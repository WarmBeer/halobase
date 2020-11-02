<template>
  <v-container>
    <v-row>
      <v-col
          cols="12"
          sm="auto"
      >
        <v-toolbar-title
            class="text-h4 white--text font-weight-bold"
        >
          All Files
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
                  width="100%"
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

            <v-card
                color="primary"
                dark
            >
              <v-list
                  color="primary"
                  dark
              >
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
                          class="select-filter white--text"
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
                          class="select-filter white--text"
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

      <v-col
          cols="12"
          sm="auto"
      >
        <select
            v-model="sorting"
            class="select-css"
            style="width: 100%;"
            @change="updateSorting()"
        >
          <option value="downloads">Most Downloaded</option>
          <option value="updated">Last Updated</option>
          <option value="uploaded">Last Added</option>
          <option value="views">Most Viewed</option>
        </select>
      </v-col>

      <v-spacer></v-spacer>
      <v-col
          cols="12"
          sm="auto"
      >
        <v-btn
            width="100%"
            disabled
            elevation="0"
            color="accent"
            class="text-caption font-weight-bold rounded-lg"
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
              flat
              dark
              color="primary"
              class="rounded-lg"
              elevation="0"
          >
            <v-card-title
                class="subtitle-2 py-2 white--text"
                @click="openFile(file.identifier)"
            >
              <div style="word-break: normal">
                {{ file.name }}
              </div>
            </v-card-title>
            <!-- TAG FILTERS
            <v-row
                class="mx-0 pa-2 pt-0"
            >
              <v-chip
                  color="accent"
                  class="white--text"
                  label
                  small
                  @click="filters.type = file.type;updateFilters()"
              >
                {{ file.type }}
              </v-chip>
              <v-chip
                  color="accent"
                  class="ml-2 white--text"
                  label
                  small
                  @click="filters.game = file.game;updateFilters()"
              >
                {{ file.game }}
              </v-chip>
            </v-row>
            -->
            <v-hover v-slot:default="{ hover }">
              <v-img
                  :aspect-ratio="16/10"
                  :src="file.images.thumb"
                  class="black mx-0"
                  @click="openFile(file.identifier)"
              >
                <v-fade-transition>
                  <div
                      v-if="hover"
                      class="pa-4 d-flex v-card--reveal subtitle-2 white--text">
                  </div>
                </v-fade-transition>
              </v-img>
            </v-hover>
            <v-card-actions
                class="pa-0"
            >
              <v-list-item
                  class="px-4"
              >
                <v-list-item-avatar
                    color="white"
                    size="28"
                    class="mr-2"
                >
                  <v-img
                      class="elevation-6"
                      alt=""
                      :src="file.author.avatar || 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/15/151e1a4b597fec44f6bf3c9d0b116ca1c9f76867_medium.jpg'"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="caption text-left orangekeg--text">{{ file.author.name }}</v-list-item-title>
                </v-list-item-content>

                <v-chip
                    small
                    dark
                    label
                    color="transparent"
                    class="no-hover pa-0"
                    @click="openFile(file.identifier)"
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
                    color="transparent"
                    class="no-hover pa-0 ml-2"
                >
                  {{ file.downloads }}
                  <v-icon
                      small
                  >
                    mdi-download
                  </v-icon>
                </v-chip>
              </v-list-item>
            </v-card-actions>
          </v-card>
      </v-col>
    </v-row>
    <v-row
        v-if="$dao.fileshare.totalFiles > $dao.fileshare.files.length"
        class="py-6"
        justify="center"
    >
      <v-btn
          light
          color="white"
          elevation="0"
          class="text-caption font-weight-bold rounded-lg"
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
    openFile(identifier) {
      this.$router.push(`/file/${identifier}`);
    },
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

  .fileName {
    white-space: nowrap ;
    word-break: normal;
    overflow: hidden ;
    text-overflow: ellipsis;
  }

  .no-hover::before {
    opacity: 0!important;
  }
</style>