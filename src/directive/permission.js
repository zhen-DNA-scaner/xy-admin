import hasPermission from '@/utils/permission'

/*
 * @description For a set of fine-grained components.
 *              In some cases, using v-permission will have no effect. 
 *              For example: Element-UI's Tab component 
 *              or el-table-column 
 *              and other scenes that dynamically render dom. 
 *              You can only do this with v-if.
 * @example <div v-permission="['admin', 'editor']"></div>
*/

export default {
  inserted(el, binding) {
    const { value } = binding
    const hasRole = hasPermission(value)
    if (!hasRole) el.parentNode && el.parentNode.removeChild(el)
  }
}