// store.js
import { reactive } from 'vue'

export const user = reactive({
  loggedIn: !!localStorage.jwt,
})
