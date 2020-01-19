import store from '../store/index'

/**
 * @param {Array} value
 * @returns {Boolean}
 */
export default function hasPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasRole = roles.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasRole) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}