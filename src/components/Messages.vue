<template>
  <div id="messages">
    <b-alert variant="info" show v-show="messages.info" class="mb-0">
      {{ messages.info }}
    </b-alert>
    <b-alert variant="warning" show v-show="messages.warnings.length > 0" class="mb-0">
      <p v-for="v in messages.warnings" class="mb-0">{{ v[1][0] }}</p>
    </b-alert>
    <b-alert variant="danger" show v-show="messages.error" class="mb-0">
      {{ messages.error }}
    </b-alert>
  </div>
</template>

<script>
  export default {
    props: {
      messages: {
        type: Object
      }
    }
  }
</script>

<style scoped>
</style>
