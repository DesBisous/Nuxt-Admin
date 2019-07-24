import pkg from './package';

export default {
	/**
	 *
	 ** 采用 spa 模式多页应用，为了兼容许多其他的第三方未能支持 SSR 的库，
	 ** universal SSR 模式针对 document 和 window 对象不友好
	 */
	mode: 'universal',

	/**
	 * 环境变量
	 */
	env: {
		NODE_ENV: process.env.NODE_ENV,
	},

	/*
	 ** Router config
	 */
	router: {
		middleware: ['tabsRouter'],
	},

	/*
	 ** Headers of the page
	 */
	head: {
		title: '安全中心',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: pkg.description },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'stylesheet', href: '/css/reset.css' },
			{ rel: 'stylesheet', href: '/css/animate.css' },
		],
	},

	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: '#fff' },

	/*
	 ** Global CSS
	 */
	css: ['~assets/ionicons/iconfont.css', '~/assets/less/common.less'],

	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		// { src: '~/plugins/i18n.js' },
		{ src: '~plugins/echarts', ssr: false },
		{ src: '~plugins/element-ui', ssr: true },
		{ src: '~plugins/jsonp', ssr: false },
		{ src: '~plugins/axios' },
		{ src: '~plugins/vuescroll' },
		{ src: '~plugins/index' },
	],

	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
	],

	/*
	 ** Axios module configuration
	 */
	axios: {
		// See https://github.com/nuxt-community/axios-module#options
		proxy: true, // 使用代理
		prefix: '/', // baseURL
		credentials: true, // automatically ，允许将身份验证头传递给后端。
		progress: true, // 与Nuxt.js进度条集成以在发出请求时显示加载栏。
	},

	proxy: {
		'/api': {
			target: 'http://192.168.13.179:9098', // 代理地址
			changeOrigin: true,
			pathRewrite: {
				'^/api': '', //将 /api 替换掉
			},
		},
		'/gyenno-admin': {
			target: 'http://whest.f3322.net:58080', // 代理地址
			changeOrigin: true,
		},
	},

	/*
	 ** Build configuration
	 */
	build: {
		extractCSS: process.env.NODE_ENV === 'prod',
		// transpile: [/^element-ui/],
		babel: {
			plugins: [
				[
					'component',
					{
						libraryName: 'element-ui',
						styleLibraryName: 'theme-chalk',
					},
				],
			],
		},
		// 代码分割
		optimization: {
			splitChunks: {
				chunks: 'all',
				// 默认为3个，设置为能拆分为5个，nuxt自身也有个commons的cacheGroups
				maxInitialRequests: 7,
				cacheGroups: {
					vue: {
						test: /[\\/]node_modules[\\/](vue.*)[\\/]/,
						chunks: 'all',
					},
					elementUi: {
						test: /[\\/]node_modules[\\/](element-ui)[\\/]/,
						chunks: 'all',
					},
					echarts: {
						test: /[\\/]node_modules[\\/](echarts)[\\/]/,
						chunks: 'all',
					},
				},
			},
		},
		//
		/*
		 ** You can extend webpack config here
		 */
		extend(config, { isDev, isClient }) {
			/*
			 ** Run ESLint on save
			 */
			if (isDev && isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/,
				});
			}
		},

		/*
		 ** 在将生成的站点部署到静态主机时，可以使用此文件。它将回退到模式：mode:'spa'，默认: '200.html'。
		 ** 两个渲染周期之间的间隔，以避免使用来自Web应用程序的API调用互相干扰，默认: 0。
		 */
		// generate: {
		// fallback: true,
		// interval: 150
		// },

		/*
		 ** 添加prefetch和preload，以加快初始页面加载时间。
		 ** 如果有许多页面和路由，您可能只想禁用此选项。
		 */
		render: {
			resourceHints: false,
		},
	},
};
