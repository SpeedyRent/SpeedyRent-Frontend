import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import Menubar from 'primevue/menubar';
import Card from 'primevue/card';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import Badge from 'primevue/badge';
import './assets/main.css'
import 'primeicons/primeicons.css'


export default (app) => {
  app.use(PrimeVue, {
    theme: {
      preset: Aura
    }
  })
  app.component('pv-menubar', Menubar)
  app.component('pv-card', Card)
  app.component('pv-button', Button)
  app.component('pv-data-table', DataTable)
  app.component('pv-column', Column)
  app.component('pv-badge', Badge)
}