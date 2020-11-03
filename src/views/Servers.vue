<template>
  <v-container>

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

    <v-alert
        text
        type="warning"
    >
      CHEATERS WILL NOW BE BANNED FROM USING HALOBASE. Server hosts can report cheaters in our Discord.
    </v-alert>
    <v-alert
        text
        type="info"
    >
      Windows Store and XBOX players can join servers by using the Find Player option in the game, just search for the gamertag next to the
      <v-icon
          small
          color="blue"
      >
        mdi-microsoft-xbox
      </v-icon>
      icon and click 'join session'.
    </v-alert>

    <!-- MESSAGE TOOLBAR START HERE--
    <v-row>
      <v-col
          cols="12"
          sm="auto"
      >
        <v-toolbar-title
            class="text-h6 white--text font-weight-bold"
        >
          Message Board
        </v-toolbar-title>
      </v-col>
      <v-spacer></v-spacer>
      <v-col
          cols="12"
          sm="auto"
      >
        <v-dialog
            v-model="dialog_message"
            max-width="600px"
        >
          <template v-slot:activator="{ on }">
            <v-btn
                v-on="on"
                :disabled="!isLoggedIn"
                text
                elevation="0"
                color="blue"
                class="text-caption font-weight-bold"
              >
              Create Message
              <v-icon
                  right
                  dark
              >
                mdi-plus
              </v-icon>
            </v-btn>
          </template>

          <v-card
              dark
              color="primary"
          >
            <v-card-title>
              <span class="headline">CREATE MESSAGE</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-form
                      v-model="valid_message"
                      style="width: 100%"
                  >
                    <v-textarea
                        v-model="message.message"
                        counter="256"
                        :rules="[v => (v && v.length <= 256) || `Server Message must be more than 0 and less than 256 characters`,]"
                        label="Message*"
                        auto-grow
                    ></v-textarea>
                  </v-form>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="red darken-1"
                  text
                  @click="dialog_message = false"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  :disabled="!valid_message"
                  @click="addMessage()"
              >
                Send
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    -->

    <!-- MESSAGE CARDS START HERE--
    <v-slide-group
        v-model="message"
        class="py-3"
        show-arrows="desktop"
        dark
    >
      <v-slide-item
          v-for="(message, i) in messages"
          :key="i"
      >
        <v-card
            dark
            width="320"
            elevation="0"
            color="rgba(255, 255, 255, .1)"
            class="mx-2 d-flex flex-column"
        >
          <v-hover v-slot:default="{ hover }">
            <v-icon
                v-if="isLoggedIn && message.sender.steamID === user.steamID"
                style="position: absolute;right: 12px;top: 12px;"
                :color="hover ? 'red' : 'red lighten-2'"
                @click="deleteMessage(message.identifier)"
            >
              mdi-trash-can-outline
            </v-icon>
          </v-hover>

          <v-card-title>
            <v-icon
                left
                small
            >
              mdi-clock
            </v-icon>
            <span class="caption font-weight-light">{{ timeSince(message.created) }} ago</span>
          </v-card-title>

          <v-card-text class="text-subtitle-2 font-weight-bold">
            {{ message.message }}
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions
              class="px-4 py-0"
          >
            <v-list-item class="pa-0">
              <v-list-item-avatar
                  color="white"
                  size="28"
                  class="mr-2"
              >
                <v-img
                    v-if="message.sender.avatar"
                    class="elevation-6"
                    alt=""
                    :src="message.sender.avatar"
                ></v-img>
                <v-icon
                    v-else
                    color="grey"
                >
                  mdi-account
                </v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="caption blue--text text-left">{{ message.sender.name }}</v-list-item-title>
              </v-list-item-content>

              <v-hover v-slot:default="{ hover }">
                <v-row
                    align="center"
                    justify="end"
                    class="mx-0"
                >
                  <v-icon
                      v-if="!isLikedMessage(message.identifier)"
                      class="mr-1"
                      :color="(hover) ? 'red' : 'rgba(255, 255, 255, .1)'"
                      @click="message.liked = true;likeMessage(message.identifier)"
                  >
                    mdi-heart
                  </v-icon>
                  <v-icon
                      v-else
                      class="mr-1"
                      color="red"
                      @click="message.liked = false;unlikeMessage(message.identifier)"
                  >
                    mdi-heart
                  </v-icon>
                  <span class="subheading white--text">{{ message.likes || 0 }}</span>
                </v-row>
              </v-hover>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-slide-item>
    </v-slide-group>
    -->


    <!-- SERVER TOOLBAR START HERE-->
    <v-row>
      <v-col
          cols="12"
          sm="auto"
      >
        <v-toolbar-title
            class="text-h4 white--text font-weight-bold"
        >
          Server Browser
        </v-toolbar-title>
      </v-col>
      <v-spacer></v-spacer>

      <v-col
          cols="12"
          sm="auto"
      >
        <div
            class="pa-1 subtitle-1 white--text font-weight-bold"
        >
          {{ $dao.servers.playersOnline }} Spartans online
        </div>
      </v-col>
      <v-col
          cols="12"
          sm="auto"
      >
        <v-btn
            width="100%"
            elevation="0"
            color="white"
            class="text-caption font-weight-bold rounded-lg"
            @click="getServers()"
            :loading="$dao.servers.gettingServers"
        >
          Refresh
          <v-icon
              right
              dark
              size="18px"
          >
            mdi-refresh
          </v-icon>
        </v-btn>
      </v-col>
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
                width="100%"
                elevation="0"
                color="accent"
                class="text-caption font-weight-bold rounded-lg"
                v-on="on"
                @click="getServerInfo()"
                :disabled="!isLoggedIn"
            >
              Host Server
              <v-icon
                  right
                  dark
                  size="18px"
              >
                mdi-steam
              </v-icon>
            </v-btn>
          </template>

          <v-card
              v-if="isGettingServerInfo"
              dark
              color="primary"
          >
            <v-card-title>
              <span class="headline">GETTING SERVER INFO</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-progress-circular
                    indeterminate
                    size="64"
                ></v-progress-circular>
              </v-container>
            </v-card-text>
          </v-card>

          <v-card
              v-else-if="inGame"
              dark
              color="primary"
          >
            <v-card-title>
              <span class="headline">SERVER INFO</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-form
                      v-model="valid"
                      style="width: 100%"
                  >
                    <v-text-field
                        v-model="server.host"
                        :counter="rules.hostLmit"
                        :rules="rules.hostRules"
                        label="Gamertag*"
                        hint="Your in-game XBOX Live name"
                        append-icon="mdi-microsoft-xbox"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="server.name"
                        :counter="rules.nameLimit"
                        :rules="rules.nameRules"
                        label="Server Name*"
                        required
                    ></v-text-field>

                    <v-textarea
                        v-model="server.message"
                        :counter="rules.messageLimit"
                        :rules="rules.messageRules"
                        label="Server Message"
                        auto-grow
                    ></v-textarea>

                    <v-select
                        v-model="server.game"
                        :items="games"
                        :rules="[v => !!v || 'Item is required']"
                        label="Game*"
                        required
                    ></v-select>

                    <v-text-field
                        v-model="server.discord"
                        label="Discord invite URL"
                        append-icon="mdi-discord"
                    ></v-text-field>
                  </v-form>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="red darken-1"
                  text
                  @click="dialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  :disabled="!valid"
                  :loading="waitingOnResponse"
                  @click="addServer()"
              >
                Add Server
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-card
              v-else
              dark
              color="primary"
          >
            <v-card-title>
              <span class="headline">HOW TO HOST</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-card-text
                    class="red--text"
                >
                  No game found. Please make sure you have a lobby open or read below:
                </v-card-text>
                <v-row
                    class="mx-0"
                    justify="start"
                >
                  <v-card-subtitle
                      class="font-weight-bold"
                  >Set game session to FRIENDS ONLY</v-card-subtitle>
                  <ol style="text-align: left">
                    <li>Open MCC</li>
                    <li>Click on 'MY GAME SESSION' (Might have to click on player icon first)</li>
                    <li>Toggle 'PRIVACY' to 'FRIENDS ONLY'</li>
                  </ol>
                </v-row>
                <v-row
                    class="mx-0"
                    justify="start"
                >
                  <v-card-subtitle
                      class="font-weight-bold"
                  >Set game details to PUBLIC</v-card-subtitle>
                  <ol style="text-align: left">
                    <li>View your profile on Steam</li>
                    <li>Select `Edit Profile`</li>
                    <li>Click on `My Privacy Settings` on the right pane</li>
                    <li>Set `Game details` to `Public`</li>
                  </ol>
                </v-row>
                <v-row
                    class="mx-0"
                    justify="start"
                >
                  <v-card-subtitle
                      class="font-weight-bold"
                  >Check if profile is ONLINE (NOT OFFLINE)</v-card-subtitle>
                  <ol style="text-align: left">
                    <li>View your profile on Steam</li>
                    <li>Check if profile is online (NOT offline)</li>
                    <li>Check if you can see MCC playing (If not: set game details to public)</li>
                  </ol>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="red darken-1"
                  text
                  @click="dialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="getServerInfo()"
              >
                Refresh
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <!-- SERVER HOST DIALOG ENDS HERE-->
    </v-row>

    <!-- SERVER CARDS START HERE-->
    <v-row
        v-if="servers.length > 0"
    >
      <v-col
          v-for="(server, i) in servers"
          :key="i"
          cols="12"
          xs="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card
              color="primary"
              flat
              dark
              class="rounded-lg"
              elevation="0"
          >
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
                      v-if="server.imageURL"
                      class="elevation-6"
                      alt=""
                      :src="server.imageURL"
                  ></v-img>
                  <v-icon
                      v-else
                      size="18px"
                  >
                    mdi-account
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="caption orangekeg--text text-left">{{ server.host }}</v-list-item-title>
                </v-list-item-content>

                <v-chip
                    label
                    dark
                    small
                    class="white--text float-right"
                    color="accent"
                >
                  {{ server.game }}
                </v-chip>
              </v-list-item>
            </v-card-actions>
            <v-divider class="mx-4"/>
            <v-row
                class="mx-4 pt-2 pb-0 subtitle-2"
            >
              {{ server.name }}
            </v-row>
            <div
                v-if="hover"
                class="pa-4 subtitle-2 text-left">
              <v-row class="mx-0 mb-1 grey--text">Started {{ timeSince(server.created) }} ago</v-row>
              <v-row class="mx-0 white--text text-break">{{ server.message }}</v-row>
            </div>
            <div
                v-else
                class="pa-4 caption grey--text text-center">
              HOVER FOR DETAILS
            </div>
            <v-row
                class="mx-0"
            >
              <v-col
                  cols="12"
                  xs="6"
                  sm="6"
                  class="pa-0"
              >
                <v-btn
                    tile
                    width="100%"
                    elevation="0"
                    color="indigo lighten-1"
                    :disabled="!server.discord"
                    :href="server.discord"
                    target="_blank"
                >
                  Join
                  <v-icon
                      right
                      dark
                      size="18px"
                  >
                    mdi-discord
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col
                  cols="12"
                  xs="6"
                  sm="6"
                  class="pa-0"
              >
                <v-btn
                    tile
                    width="100%"
                    elevation="0"
                    color="grey"
                    v-clipboard:copy="formatInvite(server.invite)"
                    v-clipboard:success="onCopy"
                >
                  Share
                  <v-icon
                      right
                      dark
                      size="18px"
                  >
                    mdi-share
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-btn
                text
                width="100%"
                elevation="0"
                color="blue"
                v-clipboard:copy="server.host"
                v-clipboard:success="onCopy"
            >
              {{ server.host }}
              <v-icon
                  right
                  dark
                  size="18px"
              >
                mdi-microsoft-xbox
              </v-icon>
            </v-btn>
            <v-btn
                v-if="server.steamID === user.steamID"
                width="100%"
                elevation="0"
                color="red"
                @click="deleteServer()"
            >
              Delete Server
              <v-icon
                  right
                  dark
                  size="18px"
              >
                mdi-trash-can-outline
              </v-icon>
            </v-btn>
            <v-btn
                v-else
                width="100%"
                elevation="0"
                color="green"
                :href="getInviteLink(server.invite)"
            >
              Join Game
              <v-icon
                  right
                  dark
                  size="18px"
              >
                mdi-steam
              </v-icon>
            </v-btn>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <v-row
        v-else-if="this.$dao.servers.gettingServers"
        justify="center"
        class="mx-0 mt-2"
    >
      <v-progress-circular
          :size="70"
          :width="7"
          color="accent"
          indeterminate
      ></v-progress-circular>
    </v-row>
    <v-row
        v-else
        justify="center"
        class="mx-0 mt-2"
    >
      <v-alert
          text
          type="error"
      >
        No servers found. Why don't you host one? It's easy!
      </v-alert>
    </v-row>
    <v-row
        v-if="isHosting"
        class="mx-0 mt-2"
    >
      <v-sheet
          color="primary"
          width="100%"
          class="pb-12 overflow-hidden rounded-lg"
      >
        <div
            class="py-6 text-h6 white--text font-weight-bold"
        >
          SERVER JOIN LOG
        </div>
        <v-list
            dark
            color="rgba(0,0,0,.2)"
            width="100%"
            max-width="600px"
            max-height="300px"
            class="mx-auto overflow-x-auto"
        >
          <v-list-item
              v-for="(client, index) in joinLog"
              :key="index"
          >
            <div
                class="subtitle-2"
            >
              {{ client.address }} joined {{ timeSince(client.joinDate) }} ago
            </div>

            <v-btn
                small
                disabled
                color="red"
                class="white--text ml-auto"
            >
              BAN
            </v-btn>
            <v-btn
                small
                disabled
                color="red"
                class="white--text ml-1"
            >
              REPORT
            </v-btn>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-row>
  </v-container>
  <!--
  <v-container v-else>
    <v-alert
        text
        type="error"
    >
      Please sign in to view this page.
    </v-alert>
  </v-container>
  -->
</template>

<script>
export default {
  name: "Servers",
  data: () => ({
    snackbar: {
      show: false,
      text: ''
    },
    valid_message: true,
    dialog_message: false,
    message: {
      message: ''
    },
    valid: true,
    dialog: false,
    waitingOnResponse: false,
    server: {
      name: '',
      host: '',
      message: '',
      game: '',
      discord: ''
    },
    rules: {
      hostLmit: 15,
      hostRules: [
        v => !!v || 'Gamertag is required',
        v => (v && v.length <= 15) || `Gamertag must be less than 15 characters`,
      ],
      nameLimit: 32,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 32) || `Server Name must be less than 32 characters`,
      ],
      messageLimit: 256,
      messageRules: [
        v => (!v || v.length <= 256) || `Server Message must be less than 256 characters`,
      ],
      discordLimit: 48,
      discordRules: [
        v => (v.length <= 48) || `Discord invite must be less than 48 characters`,
      ],
    },
    games : [
        'Halo: CE',
        'Halo 2',
        'Halo 3',
        'Halo 3: ODST',
        'Halo: Reach',
        'Halo 4'
    ]
  }),
  methods: {
    getJoinLog() {
      this.$dao.servers.getJoinLog();
    },
    getServerInfo() {
      this.$dao.servers.getServerInfo();
      if (localStorage.getItem('HaloBase_Server') !== null) {
        this.server = JSON.parse(localStorage.getItem('HaloBase_Server'));
      }
    },
    getServers() {
      if (this.isHosting) this.getJoinLog();

      this.$dao.servers.getServers();
    },
    addServer() {
      this.waitingOnResponse = true;
      localStorage.setItem('HaloBase_Server', JSON.stringify(this.server));
      this.$dao.servers.addServer(this.server)
          .then((result) => {
            console.log(result);
            if (result.ok) {
              this.getServers();
              this.dialog = false;
            }
            this.snackbar = {
              show: true,
              text: result.message
            };
            this.waitingOnResponse = false;
          })
          .catch(() => {
            this.waitingOnResponse = false;
          });
    },
    deleteServer() {
      this.$dao.servers.deleteServer()
          .then((result) => {
            if (result.ok) {
              this.getServers();
            }
            this.snackbar = {
              show: true,
              text: result.message
            };
          });
    },
    addMessage() {
      this.$dao.servers.addMessage(this.message)
          .then((result) => {
            if (result.ok) {
              this.$dao.servers.getMessages();
              this.dialog_message = false;
              this.message.message = '';
            }
            this.snackbar = {
              show: true,
              text: result.message
            };
          });
    },
    deleteMessage(identifier) {
      this.$dao.servers.deleteMessage(identifier)
          .then((result) => {
            if (result.ok) {
              this.$dao.servers.getMessages();
            }
            this.snackbar = {
              show: true,
              text: result.message
            };
          });
    },
    likeMessage(identifier) {
      this.$dao.servers.likeMessage(identifier);
    },
    unlikeMessage(identifier) {
      this.$dao.servers.unlikeMessage(identifier);
    },
    isLikedMessage(identifier) {
      return this.likedMessages.indexOf(identifier) > -1;
    },
    getInviteLink(invite) {
      return this.$dao.servers.getInviteLink(invite);
    },
    formatInvite(invite) {
      const APP_URL = process.env.VUE_APP_APP_URL || 'http://localhost:8080';
      return `${APP_URL}/invite/${invite}`;
    },
    onCopy() {
      this.snackbar = {
        show: true,
        text: 'Copied.'
      };
    },
  },
  computed: {
    user() {
      return this.$dao.user.user;
    },
    isLoggedIn() {
      return Object.keys(this.user).length > 0;
    },
    isHosting() {
      let isHosting = false;
      for (const server of this.servers) {
        if (server.steamID === this.user.steamID) {
          isHosting = true;
          break;
        }
      }
      return isHosting;
    },
    joinLog() {
      return this.$dao.servers.joinLog;
    },
    serverInfo() {
      return this.$dao.servers.serverInfo;
    },
    inGame() {
      return Object.keys(this.serverInfo).length > 0;
    },
    messages() {
      return this.$dao.servers.messages;
    },
    likedMessages() {
      return this.$dao.servers.likedMessages;
    },
    servers() {
      return this.$dao.servers.servers;
    },
    isGettingServerInfo() {
      return this.$dao.servers.gettingInfo;
    },
  },
  mounted() {
    /* unfinished work (only likes need fixing)
    this.$dao.servers.getMessages();
    this.$dao.servers.getLikedMessages();
    */
    this.getServers();
  },
  created() {
    this.refreshInterval = setInterval(() => this.getServers(), 30000);
  },
  beforeDestroy() {
    clearInterval(this.refreshInterval);
  }
}
</script>

<style lang="scss">
  $light: #2a479e;

  .v-slide-group__prev, .v-slide-group__next {
    background-color: rgba(255, 255, 255, .05);
  }
</style>