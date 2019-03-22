<template>
  <div id="dashboard-page">
    <main class="container">
      test
    </main>

    <!-- For debug -->
    <debug :data="$data">DashboardPage</debug>
  </div>
</template>

<script>
  import Debug from '@/components/Debug.vue'

  export default {
    components: {
      Debug
    }
  }
</script>

<style scoped>
</style>
