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
import  Ripple  from 'primevue/ripple'

import Galleria from 'primevue/galleria';
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';

import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Checkbox from 'primevue/checkbox';

import RadioButton from 'primevue/radiobutton';
import InputMask from 'primevue/inputmask';

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

  app.component('pv-galleria', Galleria)
  app.component('pv-stepper', Stepper)
  app.component('pv-step-list', StepList)
  app.component('pv-step-panels', StepPanels)
  app.component('pv-step-item', StepItem)
  app.component('pv-step', Step)
  app.component('pv-step-panel', StepPanel)

  app.component('pv-accordion', Accordion)
  app.component('pv-accordion-panel', AccordionPanel)
  app.component('pv-accordion-header', AccordionHeader)
  app.component('pv-accordion-content', AccordionContent)
  app.component('pv-checkbox', Checkbox)

  app.component('pv-radio-button', RadioButton)
  app.component('pv-input-mask', InputMask)

  app.directive('ripple', Ripple)
}