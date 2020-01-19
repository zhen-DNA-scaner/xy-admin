export default [{
  path: '/course/courselist',
  name: 'courseList',
  component: () => import('@/views/course/courselist.vue')
},{
  path: '/course/addvideo',
  name: 'courseAddVideo',
  component: () => import('@/views/course/addvideo.vue')
},{
  path: '/course/workslist',
  name: 'courseWorkslist',
  component: () => import('@/views/course/workslist.vue')
},{
  path: '/course/add/:id',
  name: 'courseAdd',
  component: () => import('@/views/course/addcourse.vue')
}]