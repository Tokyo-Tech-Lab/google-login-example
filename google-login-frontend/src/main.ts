import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import plugins from './plugins';
import router from './plugins/vue-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/global.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(plugins.i18n);
app.use(plugins.vuetify);

app.mount('#app');
