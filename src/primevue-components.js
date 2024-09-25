import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import i18n from './i18n'

import Menubar from 'primevue/menubar';
import Card from 'primevue/card';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import DatePicker from 'primevue/datepicker';
import InputText from 'primevue/inputtext';
import Badge from 'primevue/badge';
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import FileUpload from 'primevue/fileupload';

import './assets/main.css'
import 'primeicons/primeicons.css'



export default (app) => {
  app.use(PrimeVue, {
    theme: {
      preset: Aura
    }
  })
  app.use(i18n)

  app.component('pv-menubar', Menubar)
  app.component('pv-card', Card)
  app.component('pv-button', Button)
  app.component('pv-datepicker', DatePicker)
  app.component('pv-input-text', InputText)
  app.component('pv-data-table', DataTable)
  app.component('pv-column', Column)
  app.component('pv-badge', Badge)
  app.component('pv-tag', Tag)
  app.component('pv-dialog', Dialog)
  app.component('pv-toast', Toast)
  app.component('pv-input-number', InputNumber)
  app.component('pv-textarea', Textarea)
  app.component('pv-fileupload', FileUpload)
}