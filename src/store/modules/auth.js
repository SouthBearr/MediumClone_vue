import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
}

const mutations = {
  registerStart(state) {
    (state.isSubmitting = true), (state.validationErrors = null)
  },
  registerSuccess(state, payload) {
    (state.isSubmitting = false),
      (state.currentUser = payload),
      (state.isLoggedIn = true)
  },
  registerFailure(state, payload) {
    (state.isSubmitting = false), (state.validationErrors = payload)
  },
}

const actions = {
  register(context, Credentials) {
    return new Promise((resolve) => {
      context.commit('registerStart')
      authApi
        .register(Credentials)
        .then((response) => {
          context.commit('registerSuccess', response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch((result) => {
          context.commit('registerFailure', result.response.data.errors)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
