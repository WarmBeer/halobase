<template>
  <v-container fluid :class="$vuetify.breakpoint.mdAndUp ? 'px-8' : 'px-4'">
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
            light
            background-color="white"
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
                  class=""
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon
                    right
                    dark
                    size="18px"
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
            class="select-css rounded-lg"
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
      <!-- SERVER HOST DIALOG START HERE-->
      <v-col
          cols="12"
          sm="auto"
      >
        <v-dialog
            v-model="dialog"
            max-width="600px"
        >
          <template v-slot:activator="{ on }">
            <v-btn
                v-on="on"
                width="100%"
                elevation="0"
                color="accent"
                class="text-caption font-weight-bold rounded-lg"
            >
              Upload File
              <v-icon
                  right
                  small
              >
                mdi-upload
              </v-icon>
            </v-btn>
          </template>
          <v-card
              v-if="uploading"
              dark
              color="primary"
              class="rounded-lg"
          >
            <v-card-title>
              <span class="headline">UPLOADING..</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-progress-linear
                      color="orangekeg"
                      height="25"
                      class="rounded-lg"
                      :value="progress.percentage"
                  >
                    <strong>{{ progress.text }}</strong>
                  </v-progress-linear>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
          <v-card
              v-else
              dark
              color="primary"
          >
            <v-card-title>
              <span class="headline">UPLOAD FILE</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-form
                      v-model="valid"
                      style="width: 100%"
                  >
                    <v-text-field
                        v-model="file.name"
                        :counter="48"
                        :rules="[
                          v => !!v || 'Title is required',
                          v => (v && v.length <= 48) || `Title must be less than 48 characters`,
                        ]"
                        label="Title*"
                        hint="Title as seen in the Fileshare"
                        required
                    ></v-text-field>
                    <v-select
                        v-model="file.type"
                        :items="fileCategories"
                        :rules="[v => !!v || 'Category is required']"
                        label="Category*"
                        required
                    ></v-select>
                    <v-select
                        v-model="file.game"
                        :items="['Any'].concat($dao.collections.GAMES)"
                        :rules="[v => !!v || 'Game is required']"
                        label="Game*"
                        required
                    ></v-select>
                    <v-textarea
                        v-model="file.description.short"
                        :counter="256"
                        :rules="[v => !!v || 'Short description is required', v => (!v || v.length <= 256) || `Short description must be less than 256 characters`]"
                        label="Short Description*"
                        auto-grow
                    ></v-textarea>
                    <v-textarea
                        v-model="file.description.long"
                        :counter="8192"
                        :rules="[v => (!v || v.length <= 8192) || `Full description must be less than 8192 characters`]"
                        label="Full Description (Markdown supported)"
                        auto-grow
                    ></v-textarea>
                    <v-text-field :value="images[0]" style="display: none" :rules="[v => !!v || 'Image is required']"></v-text-field>
                    <v-text-field :value="rawFile" style="display: none" :rules="[v => !!v || 'File is required']"></v-text-field>
                    <input type="file" ref="image" @change="processImages"
                           accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG" style="display: none" multiple max="8" min="1">
                    <div
                        class="mt-2 d-flex flex-row overflow-x-auto"
                    >
                      <draggable
                          v-model="images"
                          class="d-flex flex-row"
                          style="width: 100%"
                      >
                        <v-img
                            v-for="(img, index) in tempImageUrls"
                            :key="index"
                            :src="img"
                            class="ml-2 file-image rounded-lg black"
                            :aspect-ratio="16/10"
                            width="25%"
                            max-width="25%"
                        ></v-img>
                      </draggable>
                    </div>
                    <strong class="mt-1 d-block" style="width: 100%">Min 1 max 8 images. 10MB file size limit per image.</strong>
                    <v-btn
                        elevation="0"
                        width="100%"
                        class="my-2 rounded-lg"
                        style="background-color: rgba(255, 255, 255, .05)"
                        @click="$refs.image.click()"
                    >
                      ADD IMAGES*
                    </v-btn>
                    <v-chip
                        v-if="rawFile"
                        label
                        class="mt-2"
                    >
                      <span
                          class="text-truncate"
                          style="max-width: 150px"
                      >
                        {{ rawFile.name+rawFile.type }}
                      </span>
                      {{ fileSize(rawFile.size) }}
                    </v-chip>
                    <input type="file" ref="file" @change="processFile"
                           accept=".zip,.ZIP" style="display: none" min="1">
                    <strong class="mt-1 d-block" style="width: 100%">Max 5GB file size.</strong>
                    <v-btn
                        elevation="0"
                        width="100%"
                        class="my-2 orangekeg rounded-lg"
                        @click="$refs.file.click()"
                    >
                      SELECT FILE*
                    </v-btn>
                  </v-form>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="red darken-1"
                  @click="dialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  :disabled="!valid"
                  @click="submitFile()"
              >
                Submit file
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
              class="overflow-hidden rounded-lg"
              elevation="0"
          >
            <v-hover v-slot:default="{ hover }">
              <v-img
                  :aspect-ratio="16/9"
                  :src="file.images.thumb"
                  class="black mx-0"
                  max-width="100%"
                  @click="openFile(file.identifier)"
                  style="cursor: pointer"
                  :gradient="hover ? 'to bottom, rgba(0,0,0,.2), rgba(0,0,0,.2)' : ''"
              >
              </v-img>
            </v-hover>
            <div>
              <v-row
                  class="mx-4 py-2 subtitle-2 text-left font-weight-bold"
                  style="cursor: pointer;"
                  @click="openFile(file.identifier)"
              >
                {{ file.name }}
              </v-row>
              <v-row
                  class="mx-4 pb-2 white--text font-weight-bold"
              >
                <v-chip
                    :color="filters.game === file.game ? 'blue' : 'rgba(255, 255, 255, .05)'"
                    label
                    small
                    @click="toggleGameFilter(file.game)"
                >
                  {{ file.game }}
                </v-chip>
                <v-chip
                    :color="filters.type === file.type ? 'blue' : 'rgba(255, 255, 255, .05)'"
                    class="ml-2"
                    label
                    small
                    @click="toggleTypeFilter(file.type)"
                >
                  {{ file.type }}
                </v-chip>
              </v-row>
              <v-row
                  class="mx-4 py-2 pt-0 subtitle-2 text-left"
                  style="cursor: pointer;"
                  @click="openFile(file.identifier)"
              >
                {{ file.description.short }}
              </v-row>
              <!--
              -->
              <v-divider class="mx-4"/>
              <v-card-actions
                  class="pa-0"
              >
                <v-list-item
                    class="px-4 grow"
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
                    <v-list-item-title class="caption text-left orangekeg--text font-weight-bold">{{ file.author.name }}</v-list-item-title>
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
                  <v-chip
                      small
                      dark
                      label
                      color="transparent"
                      class="no-hover pa-0 ml-2"
                  >
                    {{ fileSize(file.size) }}
                  </v-chip>
                </v-list-item>
              </v-card-actions>
            </div>
          </v-card>
      </v-col>
    </v-row>
    <v-row
        v-if="$dao.fileshare.totalFiles > $dao.fileshare.files.length"
        class="py-6"
        justify="center"
    >
      <v-btn
          dark
          color="rgba(255,255,255,.1)"
          elevation="0"
          class="text-caption font-weight-bold rounded-lg"
          @click="getMoreFiles()"
      >
        Show More Files..
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: "Fileshare",
  components: {
    draggable,
  },
  data: () => ({
    progress: {
      percentage: 0,
      text: ''
    },
    uploading: false,
    file: {
      name: '',
      type: '',
      game: '',
      description: {
        short: '',
        long: ''
      }
    },
    images: [],
    rawFile: '',
    dialog: false,
    valid: false,
    sorting: 'downloads',
    select: { state: 'Florida', abbr: 'FL' },
    filters: {
      type: '',
      game: '',
      search: ''
    },
    fileCategories: [
        'Campaign',
        'Characters',
        'Firefight',
        'Forge',
        'Gametypes',
        'Graphics',
        'Maps',
        'Menu',
        'Miscellaneous',
        'Utilities',
        'Vehicles'
    ]
  }),
  methods: {
    processImages(event) {
      this.images = this.images.concat(Array.from(event.target.files));
    },
    processFile(event) {
      if(event.target.files[0].size < 5000000000) {
        [this.rawFile] = event.target.files;
      } else {
        this.snackbar = {
          show: true,
          text: 'File too big!'
        };
      }
    },
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
    toggleGameFilter(game) {
      if (this.filters.game) {
        this.filters.game = '';
      } else {
        this.filters.game = game;
      }
      this.updateFilters();
    },
    toggleTypeFilter(type) {
      if (this.filters.type) {
        this.filters.type = '';
      } else {
        this.filters.type = type;
      }
      this.updateFilters();
    },
    resetFilters() {
      this.filters = {
        type: '',
        game: '',
        search: ''
      }
      this.updateFilters();
    },
    resetForm() {
      this.file = {
        name: '',
        type: '',
        game: '',
        description: {
          short: '',
          long: ''
        }
      };
      this.images = [];
      this.rawFile = '';
    },
    submitFile() {
      if (!this.uploading) {
        this.uploading = true;
        this.progress = {
          percentage: 0,
          text: 'Requesting file upload..'
        };
        let formData = new FormData();
        formData.append('file', JSON.stringify(this.file));
        formData.append('thumb', this.images[0]);
        this.images.slice(1).forEach((img, index) => {
          formData.append(`image[${index}]`, img);
        });
        this.$dao.file.postFile(formData)
            .then((result) => {
              if (result.ok) {
                this.progress = {
                  percentage: 30,
                  text: 'Uploading file, this may take a (long) while..'
                };
                //console.log(result);
                this.$dao.file.uploadFile(result.link, result.token, this.rawFile, result.identifier)
                    .then((data) => {
                      //console.log(data);
                      if(data.fileId) {
                        this.progress = {
                          percentage: 80,
                          text: 'File uploaded, verifying files..'
                        };
                        this.$dao.file.confirmFileUpload(result.identifier, data.fileId)
                            .then((res) => {
                              //console.log(res);
                              this.progress = {
                                percentage: 100,
                                text: res.message
                              };
                              this.snackbar = {
                                show: true,
                                text: res.message
                              };
                              this.resetForm();
                              window.open(res.link, '_blank');
                              this.uploading = false;
                              this.dialog = false;
                            });
                      } else {
                        this.uploading = false;
                        this.snackbar = {
                          show: true,
                          text: 'Could not upload file, please try again.'
                        };
                      }
                    });
              } else {
                this.uploading = false;
                this.snackbar = {
                  show: true,
                  text: result.message
                };
              }
            })
            .catch(() => {
              this.uploading = false;
              this.snackbar = {
                show: true,
                text: 'Halobase is offline.'
              };
            });
      }
    },
  },
  computed: {
    files() {
      return this.$dao.fileshare.files;
    },
    tempImageUrls() {
      const imageUrls = [];
      if (this.images) {
        this.images.forEach((img, index) => {
          imageUrls[index] = URL.createObjectURL(img);
        });
      }
      return imageUrls;
    },
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

  .file-image:first-child {
    margin-left: 0!important;
  }
</style>