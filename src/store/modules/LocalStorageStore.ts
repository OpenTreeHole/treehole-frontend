import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import Cookies from 'js-cookie'

const access = !Cookies.get('access') && localStorage.getItem('token')
const refresh = !Cookies.get('refresh') && localStorage.getItem('refresh')
if (access) {
  Cookies.set('access', access)
  localStorage.removeItem('token')
}
if (refresh) {
  Cookies.set('refresh', refresh)
  localStorage.removeItem('refresh')
}

@Module({ store: store, dynamic: true, name: 'LocalStorageStore', namespaced: true })
class LocalStorageStore extends VuexModule {
  access = Cookies.get('access') || ''
  refresh = Cookies.get('refresh') || ''
  email = localStorage.getItem('email') || ''
  newcomer = localStorage.getItem('newcomer') || ''

  @Mutation
  setRefreshToken(newRefreshToken: string) {
    this.refresh = newRefreshToken
    localStorage.setItem('refresh', newRefreshToken)
  }

  @Mutation
  setToken(newToken: string) {
    this.access = newToken
    localStorage.setItem('token', newToken)
  }

  @Mutation
  setEmail(newEmail: string) {
    this.email = newEmail
    localStorage.setItem('email', newEmail)
  }

  @Mutation
  setNewcomer(newNewcomer: string) {
    this.newcomer = newNewcomer
    localStorage.setItem('newcomer', newNewcomer)
  }

  @Mutation
  clear() {
    localStorage.clear()
    this.access = ''
    this.refresh = ''
    this.email = ''
    this.newcomer = ''
  }
}

const module = getModule(LocalStorageStore)
export default module
