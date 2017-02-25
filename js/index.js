//如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 定义（路由）组件。
const News  = { template: '<h2>新闻_常规路由</h2>' };
const Video  = { template: '<h2>视频_常规路由</h2>' };
const Pic = { template: '<h2>图片列表</h2>' };
const Music = { template: '<h2>音乐内容</h2>' };
const Index  = { template: '<h2>hello index, 函数式路由(default视图)</h2>' };
const Ask  = { template: '<h2>路由命名为：123</h2>' };
const User = { 
	template: "<div class='user'>\
				<h2>用户_{{ $route.params.id }}_动态路由</h2>\
				<router-view></router-view>\
			  </div>", 
	watch: {
    '$route' (to, from) {
      // 动态路由变化作出响应...
    	console.log("watch监听路由变化");
    }
  }};
const Usermap = { template: '<h4>地图_嵌套模板</h4>' };
const Userbaike = { template: '<h4>百科_嵌套模板</h4>' };

const One = { template: "<h4>命名视图一</h4>"}
const Two = { template: "<h4>命名视图二</h4>"}
const Three = { template: "<h4>命名视图三</h4>"}

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是通过 Vue.extend() 创建的组件构造器，或者，只是一个组件配置对象。
const routes = [
  { path: '/news', component: News },
  { path: '/video', component: Video },
  { path: '/index', component: Index },
  { 
  	path: '/user/:id', component: User, // 动态路径参数 以冒号开头
  	children: [
	    {
	      // 当 /user/:id/profile 匹配成功，
	      // 组件UserPic 会被渲染在 User 的 <router-view> 中
	      path: 'map',
	      component: Usermap
	    },
	    {
	      // 当 /user/:id/posts 匹配成功
	      // 组件UserPosts 会被渲染在 User 的 <router-view> 中
	      path: 'baike',
	      component: Userbaike
	    }
	]
  },
  {
	  path: '/ask/:askId',
	  name: 'mark',
	  component: Ask
  },
  // 命名视图
  { 
  	path: '/',
	  components: {
	    default: Three,
	    a: Two,
	    b: One,
	  }
    },
   {
	  path: '/other',
	  components: {
	    a: Two,
	    b: Three,
	  }
    }
];

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
	// mode: 'history', 默认是'hash'模式。
	routes // （缩写）相当于 routes: routes
});

/*采用编程式，创建新的路由。*/
router.push('index');
// router.push({ path: 'register', query: { plan: 'private' }}) //// 带查询参数

/*命名路由*/
// router.push({ name: 'user', params: { askId: 123 }});

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app');