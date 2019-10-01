# xy-admin-vue

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Permission

### Page-level permissions

Control permissions by setting route meta properties in `/src/router/modules/*.js`:

```
export default [{
  path: '/',
  name: 'home',
  component: () => import('@/views/index.vue')
},{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/index.vue')
},{
  path: '/403',
  name: '403',
  component: () => import('@/views/error/403.vue')
},{
  path: '/permission',
  name: 'permission',
  component: () => import('@/views/permission.vue'),
  // the route is not set permission if meta roles is undefined
  meta: [{
    roles: ['admin', 'editor']
  }]
}]
```
### Components-level permissions

You can use `$auth(roles)` to control component's permission. Such as:

```
<a-menu-item v-if="$auth(['admin'])" key="permission">
  <router-link to="/permission"><a-icon type="key" /><span>管理权限页</span></router-link>
</a-menu-item>
```

The roles should be provided by the server and stored in Vuex.