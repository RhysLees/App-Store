<template>
    <div class="bg-gray-900 text-white p-8 w-full min-h-screen flex flex-col justify-center items-center">
        <div class="text-center">
            <p>Current Version: {{ currentVersion }}</p>
            <p>{{ status }}</p>
        </div>
        <div v-if="update.show" class="text-center mt-8">
            <p>Release Date: {{ update.releaseDate }}</p>
            <p>Release Name: {{ update.releaseName }}</p>
            <p>Release Notes:</p>
            <p v-html="update.releaseNotes"></p>
            <p>Version: {{ update.version }}</p>
            <p>Available: {{ update.available }}</p>

            <div v-if="update.available"> 
                <div v-if="!update.downloaded">
                    <button @click="download" class="mt-4 bg-white hover:bg-gray-200 w-full text-black p-2 font-bold border-gray-300 border rounded">Download</button>
                    <div class="shadow w-full bg-grey-200 rounded mt-4">
                        <div class="bg-blue-500 text-xs leading-none py-1 text-center text-white rounded" 
                        :style="{width: update.downloadPercentage}">{{ update.downloadPercentage }}</div>
                    </div>
                </div>
                <div v-if="update.downloaded">
                    <button @click="install" class="mt-4 bg-white hover:bg-gray-200 w-full text-black p-2 font-bold border-gray-300 border rounded">Install & Restart</button>
                </div>
            </div>
  
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
const { ipcRenderer } = require('electron');
import moment from 'moment';
export default {
    data() {
        return {
            status: 'Checking Status',
            currentVersion: '0.0.0',
            update: {
                releaseDate: null,
                releaseName: null,
                releaseNotes: null,
                version: null,
                available: false,
                show: false,
                downloaded: false,
                downloadPercentage: '0%'
            },
        }
    },
    created() {
        ipcRenderer.send('app_version');
		ipcRenderer.on('app_version', (event, args) => {
            ipcRenderer.removeAllListeners('app_version');
			this.currentVersion = args.version;
		});
        
        ipcRenderer.send('app_check_update');
		ipcRenderer.on('update_available', (event, args) => {
			ipcRenderer.removeAllListeners('update_available');
            ipcRenderer.removeAllListeners('update_not_available');

            console.log(args);

			this.update.releaseDate = moment(args.releaseDate).format("dddd, MMMM Do YYYY, h:mm:ss");
			this.update.releaseName = args.releaseName;
			this.update.releaseNotes = args.releaseNotes;
			this.update.version = args.version;
			this.update.available = true;
			
            this.update.show = true;
			this.status = 'Update Available';
		});

        ipcRenderer.on('update_not_available', (event, args) => {
            ipcRenderer.removeAllListeners('update_available');
            ipcRenderer.removeAllListeners('update_not_available');
            ipcRenderer.removeAllListeners('download_percent');
            ipcRenderer.removeAllListeners('update_downloaded');

			this.update.releaseDate = moment(args.releaseDate).format("dddd, MMMM Do YYYY, h:mm:ss");
			this.update.releaseName = args.releaseName;
			this.update.releaseNotes = args.releaseNotes;
			this.update.version = args.version;
            this.update.available = false;
            
            this.update.show = true;
            this.status = 'Update Available';
		});
        
        ipcRenderer.on('download_percent', (event, args) => {
            this.downloadPercentage = Math.trunc(args.percent)+'%';
		});
        
        ipcRenderer.on('update_downloaded', () => {
            ipcRenderer.removeAllListeners('update_downloaded');
            ipcRenderer.removeAllListeners('download_percent');
            this.update.downloaded = true;
		});
    },
    methods: {
        download() {
            ipcRenderer.send('app_update_download');
        },
        install() {
            ipcRenderer.send('app_update_install');
        }
    },
    computed: {
        ...mapGetters({loggedIn: 'getLoggedIn'})
    }
}
</script>

