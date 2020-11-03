const API_URL = process.env.VUE_APP_API_URL || 'http://localhost';
let TOKEN = '';

const dao = {
    user: {
        user: {},
        authLink() {
            return `${API_URL}/user/auth`;
        },
        setToken(token) {
            TOKEN = token;
            localStorage.setItem('HaloBase_Token', TOKEN);
            if (this.token) {
                this.getUser();
            }
        },
        getToken() {
            TOKEN = localStorage.getItem('HaloBase_Token');
            if (TOKEN) {
                this.getUser();
            }
        },
        deleteToken() {
            TOKEN = '';
            localStorage.removeItem('HaloBase_Token');
        },
        logout() {
            this.deleteToken();
            this.user = {};
        },
        getUser() {
            fetch(`${API_URL}/user`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
                .then(response => response.json())
                .then((result) => {
                    if (result.authorized) {
                        this.user = result.user;
                        this.user.avatar = this.user.avatar.replace('.jpg', '_medium.jpg');
                    } else {
                        this.deleteToken();
                    }
                }).catch(() => {
                    console.error('Error connecting to server');
                });
        }
    },
    servers: {
        messages: [],
        likedMessages: [],
        getMessages() {
            this.getLikedMessages();
            fetch(`${API_URL}/messages`, {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
                .then(response => response.json())
                .then((result) => {
                    this.messages = result;
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        getLikedMessages() {
            fetch(`${API_URL}/messages/liked`, {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
                .then(response => response.json())
                .then((result) => {
                    this.likedMessages = [];
                    for (let message of result) {
                        console.log(message);
                        this.likedMessages.push(message.postIdentifier);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        addMessage(message) {
            return fetch(`${API_URL}/messages/add`, {
                method: 'POST',
                body: JSON.stringify(message),
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
                .then(response => response.json())
                .then(result => result);
        },
        deleteMessage(identifier) {
            return fetch(`${API_URL}/messages/delete/${identifier}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
                .then(response => response.json())
                .then(result => result);
        },
        likeMessage(identifier) {
            fetch(`${API_URL}/messages/like/${identifier}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
                .then(() => {
                    this.getMessages();
                });
        },
        unlikeMessage(identifier) {
            fetch(`${API_URL}/messages/unlike/${identifier}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
                .then(() => {
                    this.getMessages();
                });
        },
        servers: [],
        gettingServers: false,
        getServers() {
            if (!this.gettingServers) {
                this.servers = [];
                this.gettingServers = true;
                this.getPlayersOnline();
                fetch(`${API_URL}/servers`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                })
                    .then(response => response.json())
                    .then((result) => {
                        this.servers = result;
                        this.gettingServers = false;
                    })
                    .catch((err) => {
                        console.error(err);
                        this.gettingServers = false;
                    });
            }
        },
        addServer(server) {
            return fetch(`${API_URL}/servers/add`, {
                method: 'POST',
                body: JSON.stringify(server),
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
                .then(response => response.json())
                .then(result => result);
        },
        deleteServer() {
            return fetch(`${API_URL}/servers/delete`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
                .then(response => response.json())
                .then(result => result);
        },
        playersOnline: 0,
        getPlayersOnline() {
            fetch(`${API_URL}/servers/watching`)
                .then(response => response.json())
                .then((result) => {
                    this.playersOnline = result;
                }).catch(() => {
                });
        },
        serverInfo: {},
        gettingInfo: false,
        getServerInfo() {
            if (!this.gettingInfo) {
                this.serverInfo = {};
                this.gettingInfo = true;
                fetch(`${API_URL}/servers/session`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                })
                    .then(response => response.json())
                    .then((result) => {
                        if (result.ok) {
                            this.serverInfo = result.data;
                        }
                        this.gettingInfo = false;
                    })
                    .catch((err) => {
                        console.error(err);
                        this.gettingInfo = false;
                    });
            }
        },
        getInviteLink(invite) {
            return `${API_URL}/invite/${invite}`;
        }
    },
    fileshare: {
        page: 1,
        totalFiles: 0,
        files: [],
        sorting: 'downloads',
        filters: {
            game: '',
            type: '',
            search: ''
        },
        getFiles() {
            this.page = 1;
            fetch(`${API_URL}/files?sort=${this.sorting}&game=${this.filters.game}&type=${this.filters.type}&search=${this.filters.search}`)
                .then(response => response.json())
                .then((result) => {
                    this.totalFiles = result.total
                    this.files = result.results;
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        getMoreFiles() {
            ++this.page;
            fetch(`${API_URL}/files?page=${this.page}&sort=${this.sorting}&game=${this.filters.game}&type=${this.filters.type}&search=${this.filters.search}`)
                .then(response => response.json())
                .then((result) => {
                    this.totalFiles = result.total
                    this.files = this.files.concat(result.results)
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    },
    file: {
        file: {},
        getFile(identifier) {
            return fetch(`${API_URL}/files/${identifier}`)
                .then(response => response.json())
                .then(result => result);
        },
        getDownload(identifier) {
            return fetch(`${API_URL}/download/${identifier}`)
                .then(response => response.json())
                .then(result => result);
        },
    }
}

export default dao;