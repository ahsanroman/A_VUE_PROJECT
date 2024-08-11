import { createApp } from 'vue';

import router from './router.js';
import store from './store/index.js'
import App from './App.vue';

const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app');
