<template>
  <div class="alert alert-danger alert-dismissible" role="alert" v-show="store.state.error">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <strong>Error!</strong> {{ store.state.error }}
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'

const store = useStore()

store.watch((state) => {
  return state.error
}, (msg) => {
  if (!msg) {
    return
  }

  setTimeout(() => {
    // 에러 메시지를 3초 동안 노출한다
    store.commit('setError', null)
  }, 3000)
})
</script>

<style scoped>
.alert {
  display: block;
  position: fixed;
  bottom: 3em;
  right: 3em;
  max-width: 100%;
  opacity: .8;
  z-index: 999;
}
</style>
