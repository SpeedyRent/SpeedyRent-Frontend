import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import i18n from './i18n';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import FileUpload from 'primevue/fileupload';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(i18n);
app.use(ToastService);
app.use(ConfirmationService);

app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('FileUpload', FileUpload);
app.component('Toast', Toast);
app.component('ConfirmDialog', ConfirmDialog);

app.mount('#app');
