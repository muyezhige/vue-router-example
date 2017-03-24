/* @author j-lihonglei@360.cn
 * 依赖于官方支持的vue-router库,会产生历史记录。
 */

// 手机号验证组件
var phoneView  = {
	template: '\
	<div>\
		<p class="title-text">为了您的账户安全 请验证本人手机号</p>\
		<div class="form-item">\
			<span>手机号码：</span>\
			<input type="tel" v-model=phone >\
		</div>\
		<div class="form-item">\
			<input type="tel" value="" v-model=code placeholder="请输入5位短信验证码" class="verify-code">\
			<a href="" class="getCode">获取短信验证码</a>\
		</div>\
		<div class="submit-box">\
			<a href="" class="btn btn-next"\
			v-bind:class="{btnGray:formVerify}"\
			v-on:click.prevent=nextSubmit>下一步</a>\
		</div>\
	</div>',
	data: function(){
		return {
	    	phone: "",
	    	code:  ""
	    };
	},
	computed: {
		// 表单验证。
		formVerify: function(){
			if(/^1[^01269]\d{9}$/.test(this.phone) && /^\d{5}$/.test(this.code)){
				return false;
			}
			return true;
		}
	},
	methods: {
		nextSubmit: function(e){
			var target = e.target;
			if(/btnGray/.test(target.getAttribute("class"))){
				return;
			}
			router.push('/idcard');
			vm.$refs.step.className = "step step2";
		}
	}
};

// 身份证验证组件
var nameReg = /[^\u4e00-\u9fa5.]/g;
var idcardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

var idcardView = {
	template: '<div>\
		<p class="title-text">为了您的账户安全 请验证本人身份证</p>\
		<div class="form-item" ref=aa>\
			<span>真实姓名：</span>\
			<input type="text" v-model=realname>\
		</div>\
		<div class="form-item">\
			<span>身份证号：</span>\
			<input type="text" v-model=idcard>\
		</div>\
		<p class="warning">\
			请确保身份证号与实名认证的身份证号<code>[一致]</code>.并且输入<code>[正确]</code>\
		</p>\
		<div class="submit-box">\
			<a href="" class="btn btn-next" v-bind:class="{btnGray: formVerify}" @click.prevent=idcardVerify>验证</a>\
		</div>\
	</div>',
	data: function(){
		return {
			realname: "",
			idcard: ""
		};
	},
	computed: {
		formVerify: function(){
			if(this.realname && !this.realname.match(nameReg) && this.idcard && idcardReg.test(this.idcard)){
				return false;
			}
			return true;
		}
	},
	methods: {
		idcardVerify: function(e){
			var target = e.target;
			if(/btnGray/.test(target.getAttribute("class"))){
				return;
			}
			router.push('/success');
		}
	}
};
// 验证成功组件
var successView = {
	template: '\
	<div>\
		<div class="success-icon">\
			<span></span>\
			提交成功\
		</div>\
		<p class="success-alert">\
			工作人员将在1-2个工作日内完成提现审核\
		</p>\
		<div class="submit-box">\
			<a href="javascript:history.go(-1);" class="btn btn-next">查看详情</a>\
		</div>\
	</div>'
};

// 定义路由
var routes = [
	{path: "/phone",   component: phoneView},
	{path: "/idcard",  component: idcardView},
	{path: "/success", component: successView}
];

// 创建router 实例
var router = new VueRouter({
	routes: routes
});

router.push('/phone');

// 创建和挂载根目录
var vm = new Vue({
  router: router,
}).$mount('#ncf');