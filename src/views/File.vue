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
            class="mt-2 d-flex flex-row overflow-x-auto"
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
                {{ detail.name }}
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
              class="py-2 subtitle-1 grey--text font-weight-bold text-left"
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
              class="mt-8 py-2 subtitle-1 grey--text font-weight-bold text-left"
          >
            FULL DESCRIPTION
          </div>
          <v-divider dark/>
          <div
              class="py-2 subtitle-1 white--text text-left"
          >
            <div class="markdown" v-html="marked(newDescription)"></div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import marked from 'marked';
import DOMPurify from 'dompurify';

export default {
  name: "File",
  data: () => ({
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
    fileImages: [],
    oldFileImages: [],
    updating: false,
    newFile: '',
    selectedImage: 0,
    newVersion: '',
    newCaption: '',
    newDescription: '',
    newImages: '',
    waitingForDownload: false,
    downloadToken: '',
    downloadLink: ''
  }),
  methods: {
    marked(input) {
      return marked(DOMPurify.sanitize(input));
    },
    getFile() {
      this.$dao.file.getFile(this.identifier)
          .then((file) => {
            this.selectedImage = 0;
            this.file = file;
            this.newFile = '';
            this.newVersion = file.version;
            this.newCaption = file.description.short;
            this.newDescription = file.description.long;
            this.fileImages = [...file.images.slider];
            this.fileImages.unshift(file.images.thumb);
            this.oldFileImages = [...this.fileImages];
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
    imageBlobs() {
      const imageUrls = [];
      if (this.fileImages) {
        Array.from(this.fileImages).forEach((img) => {
          if (typeof img === 'string') {
            imageUrls.push(img);
          } else {
            imageUrls.push(URL.createObjectURL(img));
          }
        });
      }
      return imageUrls;
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