<template>
  <div id="app">
    <mcv-topbar />

    <router-view/>
  </div>
</template>

<script>
import McvTopbar from '@/components/Topbar.vue'

export default {
  name: 'McvApp',
  components: {
    McvTopbar
  }
}
</script>