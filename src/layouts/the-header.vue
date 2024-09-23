<template>
  <div class="card">
    <pv-menubar :model="items" class="style_menubar" >
      <template #start>
        <img class="Logo_Speedy_Rent" alt="Logo" src="../assets/LOGO_SPEEDY_RENT.jpg">
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <RouterLink v-ripple class="flex items-center" v-bind="props.action" :to="item.to">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <pv-badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
          <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
          <i v-if="hasSubmenu" :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
        </RouterLink>
      </template>
      <template #end>
        <div class="Apartado_Usuario">
          <div>
            <img class="Person_1" alt="Perfil_Person" src="../assets/Avatar_1.jpg">
          </div>
          <div>
            <pv-button class="p-button p-component p-button-text" @click="logout" style="align-content: center">
              <i class="pi pi-sign-out"></i>
            </pv-button>
          </div>
        </div>
      </template>
    </pv-menubar>
  </div>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    to: '/'
  },
  {
    label: 'Features',
    icon: 'pi pi-star'
  },
  {
    label: 'Projects',
    icon: 'pi pi-search',
    items: [
      {
        label: 'Core',
        icon: 'pi pi-bolt',
        shortcut: '⌘+S'
      },
      {
        label: 'Blocks',
        icon: 'pi pi-server',
        shortcut: '⌘+B'
      },
      {
        label: 'UI Kit',
        icon: 'pi pi-pencil',
        shortcut: '⌘+U'
      },
      {
        separator: true
      },
      {
        label: 'Templates',
        icon: 'pi pi-palette',
        items: [
          {
            label: 'Apollo',
            icon: 'pi pi-palette',
            badge: 2
          },
          {
            label: 'Ultima',
            icon: 'pi pi-palette',
            badge: 3
          }
        ]
      }
    ]
  },
  {
    label: 'My Notifications',
    icon: 'pi pi-envelope',
    badge: 3,
    to: '/myNotifications'
  }
]);
</script>

<style scoped>
.style_menubar{
  background-color:#2C3E50;
}

.flex.items-center{
 color:#A9A9A9;
}

.Logo_Speedy_Rent{
  width: 50px;
  border-radius: 45%;
}
.Person_1{
  width: 40px;
  height: 40px;
  border-radius: 45%;
  padding: 5px;
  align-items: center;
}
.Apartado_Usuario{
  display: flex;
  align-items: center;/*Asegura que tanto la imagen como el ícono del botón estén alineados verticalmente en el centro de la fila.*/
  gap: 10px;/*Añade un espacio de 10 píxeles entre la imagen y el botón*/
}
</style>