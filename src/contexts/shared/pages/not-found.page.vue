<template>
  <div class="not-found">
    <router-link to="/home" class="logo-link">
      <h1>Speedy Rent</h1>
    </router-link>
    <h2>{{$t('notFound1')}}</h2>
    <p>{{$t('notFound2')}}</p>
    <p>{{$t('notFound3')}}</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  background-color: #f9f9f9;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 3em;
  color: #007BFF;
}

h2 {
  font-size: 2em;
  color: #333;
  margin: 10px 0;
}

p {
  font-size: 1.2em;
  color: #666;
  margin: 5px 0;
}

.logo-link {
  text-decoration: none;
  color: inherit;
  box-shadow: none;
}

.logo-link:hover {
  text-decoration: none;
  color: inherit;
}
</style>