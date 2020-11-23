<template>
  <v-container fluid :class="$vuetify.breakpoint.mdAndUp ? 'px-8' : 'px-4'">

    <!-- SNACKBAR STARTS HERE -->
    <v-snackbar
        v-model="snackbar.show"
        timeout="8000"
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-row>
      <v-col
          cols="12"
          md="8"
      >
        <v-hover v-slot:default="{ hover }">
          <v-img
              v-if="file.images.thumb"
              class="align-end mx-auto black rounded-lg"
              :aspect-ratio="16/9"
              width="100%"
              :src="imageBlobs[selectedImage]"
          >
            <v-spacer/>
            <v-expand-transition>
              <div
                  v-show="!hover"
              >
                <div
                    class="pa-4 text-h6 white--text text-left"
                    style="background-color: rgba(0,0,0,.6);"
                >
                  {{ file.name }}
                </div>
              </div>
            </v-expand-transition>
          </v-img>
        </v-hover>
        <!-- IMAGES -->
        <div
            class="mt-4 d-flex flex-row overflow-x-auto"
        >
          <v-sheet
              color="transparent"
              class="d-flex flex-row"
              width="100%"
          >
            <v-img
                v-for="(img, index) in imageBlobs"
                :key="index"
                :src="img"

                class="ml-2 file-image rounded-lg"
                style="background-color: black"
                :class="selectedImage === index ? 'selected' : ''"
                :aspect-ratio="16/10"
                width="25%"
                max-width="25%"
                @click="selectedImage = index"
            ></v-img>
          </v-sheet>
        </div>
      </v-col>
      <!-- DETAILS -->
      <v-col
          cols="12"
          md="4"
      >
        <v-card
            flat
            color="primary"
            class="px-4 py-4 white--text rounded-lg"
        >
          <v-row
              v-for="(detail, index) in details"
              :key="index"
              class="px-2 mx-0 rounded"
              :style="(index % 2 === 117) ? 'background-color: rgba(255, 255, 255, 0.025)' : ''"
          >
            <v-col
                cols="6"
                class="pa-0"
            >
              <div class="subtitle-2 text-left grey--text">
                {{ detail.name }}:
              </div>
            </v-col>
            <v-col
                cols="6"
                class="pa-0"
            >
              <div
                  v-if="detail.link"
                  class="subtitle-2 text-right orangekeg--text"
                  style="cursor:pointer;"
                  :to="`/${detail.link}`"
              >
                {{ detail.value }}
              </div>
              <div v-else class="subtitle-2 text-right white--text">
                {{ detail.value }}
              </div>
            </v-col>
          </v-row>
        </v-card>
        <v-btn
            :loading="waitingForDownload"
            color="accent"
            width="100%"
            class="mt-2 font-weight-bold rounded-lg"
            @click="getDownload()"
        >
          DOWNLOAD
          <v-icon
              right
              small
          >
            mdi-download
          </v-icon>
        </v-btn>
        <v-dialog
            v-model="dialog"
            max-width="600px"
        >
          <template v-slot:activator="{ on }">
            <v-btn
                v-if="myFile"
                v-on="on"
                width="100%"
                elevation="0"
                color="blue"
                dark
                class="mt-2 font-weight-bold rounded-lg"
            >
              Edit File
              <v-icon
                  right
                  small
              >
                mdi-pencil
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
                      :value="$dao.file.uploadProgress"
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
                        v-model="updatedFile.name"
                        disabled
                        :counter="48"
                        :rules="[
                          v => !!v || 'Title is required',
                          v => (v && v.length <= 48) || `Title must be less than 48 characters`,
                        ]"
                        label="Title"
                        hint="Title as seen in the Fileshare"
                        required
                    ></v-text-field>
                    <v-select
                        v-model="updatedFile.type"
                        :items="$dao.collections.FILE_CATEGORIES"
                        :rules="[v => !!v || 'Category is required']"
                        label="Category"
                        required
                    ></v-select>
                    <v-select
                        v-model="updatedFile.game"
                        :items="['Any'].concat($dao.collections.GAMES)"
                        :rules="[v => !!v || 'Game is required']"
                        label="Game"
                        required
                    ></v-select>
                    <v-textarea
                        v-model="updatedFile.description.short"
                        :counter="256"
                        :rules="[v => !!v || 'Short description is required', v => (!v || v.length <= 256) || `Short description must be less than 256 characters`]"
                        label="Short Description"
                        auto-grow
                    ></v-textarea>
                    <v-textarea
                        v-model="updatedFile.description.long"
                        :counter="8192"
                        :rules="[v => (!v || v.length <= 8192) || `Full description must be less than 8192 characters`]"
                        label="Full Description (Markdown supported)"
                        auto-grow
                    ></v-textarea>
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
                            v-for="(img, index) in imageBlobs"
                            :key="index"
                            :src="img"
                            class="ml-2 file-image rounded-lg black"
                            :aspect-ratio="16/10"
                            width="25%"
                            max-width="25%"
                        >
                          <v-hover v-slot:default="{ hover }">
                            <v-icon
                                :color="hover ? 'red' : 'rgba(255,255,255,.75)'"
                                class="float-right"
                                @click="removeImage(index)"
                            >
                              mdi-trash-can
                            </v-icon>
                          </v-hover>
                        </v-img>
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
                      ADD IMAGES
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
                      SELECT FILE
                    </v-btn>
                  </v-form>
                </v-row>
              </v-container>
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
                  :disabled="!valid || !madeChanges"
                  @click="submitChanges()"
              >
                Save Changes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col
          cols="12"
      >
        <v-sheet
            color="primary"
            class="px-8 pb-6 overflow-hidden rounded-lg"
        >
          <div
              class="py-6 text-h6 white--text font-weight-bold"
          >
            {{ file.name }}
          </div>
          <div
              class="py-2 subtitle-1 blue--text font-weight-bold text-left"
          >
            SHORT DESCRIPTION
          </div>
          <v-divider dark/>
          <div
              class="py-2 subtitle-1 white--text text-left"
          >
            {{ file.description.short }}
          </div>
          <div
              class="mt-8 py-2 subtitle-1 blue--text font-weight-bold text-left"
          >
            FULL DESCRIPTION
          </div>
          <v-divider dark/>
          <div
              class="py-2 subtitle-1 white--text text-left"
          >
            <div class="markdown" v-html="marked(file.description.long)"></div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import marked from 'marked';
import DOMPurify from 'dompurify';
import draggable from 'vuedraggable';


export default {
  name: "File",
  components: {
    draggable
  },
  data: () => ({
    updatedFile: {
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
    snackbar: {
      show: false,
      text: ''
    },
    identifier: '',
    file: {
      name: '',
      author: {
        name: '',
      },
      description: {
        short: '',
        long: '',
      },
      images: {
        thumb: '',
        slider: [],
      },
    },
    progress: {
      percentage: 0,
      text: ''
    },
    uploading: false,
    selectedImage: 0,
    waitingForDownload: false,
    downloadToken: '',
    downloadLink: ''
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
    submitChanges() {
      if (!this.uploading) {
        this.uploading = true;
        this.progress = {
          percentage: 0,
          text: 'Requesting file update..'
        };
        let formData = new FormData();
        formData.append('upload', !!this.rawFile);
        formData.append('file', JSON.stringify(this.updatedFile));
        formData.append('thumb', this.images[0]);
        this.images.slice(1).forEach((img, index) => {
          formData.append(`image[${index}]`, img);
        });
        this.$dao.file.postFileUpdate(this.identifier, formData)
            .then((result) => {
              if (result.ok) {
                if (result.token) {
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
                                this.uploading = false;
                                this.dialog = false;
                                this.rawFile = '';
                                this.getFile();
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
                  this.progress = {
                    percentage: 100,
                    text: result.message
                  };
                  this.snackbar = {
                    show: true,
                    text: result.message
                  };
                  this.uploading = false;
                  this.dialog = false;
                  this.rawFile = '';
                  this.getFile();
                }
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
    removeImage(index) {
      this.images.splice(index, 1);
    },
    marked(input) {
      return marked(DOMPurify.sanitize(input));
    },
    getFile() {
      this.$dao.file.getFile(this.identifier)
          .then((file) => {
            this.selectedImage = 0;
            this.file = file;
            this.images = [...file.images.slider];
            this.images.unshift(file.images.thumb);
            this.updatedFile = {
              name: file.name,
              type: file.type,
              game: file.game,
              description: {
                short: file.description.short,
                long: file.description.long
              }
            };
          });
    },
    getDownload() {
      if (this.file.identifier) {
        this.waitingForDownload = true;
        this.$dao.file.getDownload(this.file.identifier)
            .then((data) => {
              if (data.ok) {
                // open download window
                window.open(`https://cdn.halobase.net/file/halokeg-private/${data.link}?Authorization=${data.token}`, '_blank');
              } else {
                this.snackbar = {
                  show: true,
                  text: data.message
                };
              }
              this.waitingForDownload = false;
            })
            .catch(() => {
              this.snackbar = {
                show: true,
                text: 'Something went wrong.'
              };
              this.waitingForDownload = false;
            });
      } else {
        this.snackbar = {
          show: true,
          text: 'File not found.'
        }
      }
    },
  },
  computed: {
    user() {
      return this.$dao.user.user;
    },
    details() {
      const file = this.file;
      const timeSince = this.timeSince;
      const fileSize = this.fileSize;
      return [
        { name: 'Author', value: file.author.name },
        { name: 'File Type', value: file.type },
        { name: 'Game', value: file.game },
        { name: 'Uploaded', value: timeSince(file.created) + ' ago' },
        { name: 'Updated', value: timeSince(file.updated) + ' ago' },
        { name: 'Downloads', value: file.downloads },
        { name: 'Views', value: file.views },
        { name: 'Filesize', value: fileSize(file.size) }
      ]
    },
    myFile() {
      return this.file.author ? (this.user.steamID === this.file.author.id || this.user.role > 1) : 0;
    },
    madeChanges() {
      return (
          this.rawFile
          || JSON.stringify(this.images) !== JSON.stringify(this.oldImages)
          || this.updatedFile.type !== this.file.type
          || this.updatedFile.game !== this.file.game
          || this.updatedFile.description.short !== this.file.description.short
          || this.updatedFile.description.long !== this.file.description.long
      );
    },
    imageBlobs() {
      const imageUrls = [];
      if (this.images) {
        Array.from(this.images).forEach((img) => {
          if (typeof img === 'string') {
            imageUrls.push(img);
          } else {
            imageUrls.push(URL.createObjectURL(img));
          }
        });
      }
      return imageUrls;
    },
    oldImages() {
      const images = [...this.file.images.slider];
      images.unshift(this.file.images.thumb);
      return images;
    },
  },
  beforeMount() {
    if (this.$route.params) {
      this.identifier = this.$route.params.identifier;
      this.getFile();
    }
  },
}
</script>

<style lang="scss" scoped>
  .file-image {
    border: 2px solid transparent;
    -webkit-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;

    &.selected {
      border: 2px solid #f66003;
    }

    &:first-child {
      margin-left: 0!important;
    }
  }
</style>