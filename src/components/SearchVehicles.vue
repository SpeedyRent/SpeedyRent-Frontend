<template>
  <div class="search-vehicles">
    <h1>Busca de vehículos para rentar</h1>

    <!-- Filtros de búsqueda -->
    <div class="filters">
      <label>Marca:</label>
      <input v-model="filters.marca" type="text" placeholder="Buscar por marca" />

      <label>Modelo:</label>
      <input v-model="filters.modelo" type="text" placeholder="Buscar por modelo" />

      <label>Año:</label>
      <input v-model="filters.anio" type="number" placeholder="Buscar por año" />

      <label>Precio máximo:</label>
      <input v-model="filters.precioMax" type="number" placeholder="Precio máximo" />

      <button @click="buscarVehiculos">Buscar</button>
    </div>

    <!-- Tabla de resultados -->
    <div v-if="vehiculosFiltrados.length">
      <h2>Resultados de búsqueda:</h2>
      <table class="table">
        <thead>
        <tr>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Año</th>
          <th>Precio</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="vehiculo in vehiculosFiltrados" :key="vehiculo.id">
          <td>{{ vehiculo.marca }}</td>
          <td>{{ vehiculo.modelo }}</td>
          <td>{{ vehiculo.anio }}</td>
          <td>{{ vehiculo.precio }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Mensaje de error si no se encuentran vehículos -->
    <div v-else>
      <p>No se encontraron vehículos con los filtros de búsqueda.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vehiculos: [
        { id: 1, marca: 'Toyota', modelo: 'Corolla', anio: 2020, precio: 150 },
        { id: 2, marca: 'Honda', modelo: 'Civic', anio: 2021, precio: 170 },
        { id: 3, marca: 'Ford', modelo: 'Focus', anio: 2019, precio: 130 },
        // Otros vehículos de ejemplo
      ],
      filters: {
        marca: '',
        modelo: '',
        anio: '',
        precioMax: ''
      },
      vehiculosFiltrados: []
    };
  },
  methods: {
    buscarVehiculos() {
      this.vehiculosFiltrados = this.vehiculos.filter((vehiculo) => {
        return (
            (this.filters.marca === '' || vehiculo.marca.toLowerCase().includes(this.filters.marca.toLowerCase())) &&
            (this.filters.modelo === '' || vehiculo.modelo.toLowerCase().includes(this.filters.modelo.toLowerCase())) &&
            (this.filters.anio === '' || vehiculo.anio == this.filters.anio) &&
            (this.filters.precioMax === '' || vehiculo.precio <= this.filters.precioMax)
        );
      });
    }
  },
  mounted() {
    this.vehiculosFiltrados = this.vehiculos; // Inicialmente mostramos todos los vehículos
  }
};
</script>

<style scoped>
.search-vehicles {
  margin: 20px;
}

.filters {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.filters label {
  margin: 10px 0 5px;
}

.filters input {
  margin-bottom: 10px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
}
</style>
