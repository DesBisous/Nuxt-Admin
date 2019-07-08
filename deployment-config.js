module.exports = function(options) {
	// @see https://www.npmjs.com/package/ssh-deploy-release

	return {
		// Common configuration
		// These options will be merged with those specific to the environment
		common: {
			debug: true, // 如果true，将显示所有命令。
			localPath: 'dist', // 要部署的本地文件夹的名称。
			share: {}, // 要在发行版之间“共享”的文件夹列表
			exclude: [], // 路径，不部署的内容
			create: [], // 要在远程服务器上创建的文件夹列表。
			archiveType: 'zip', // zip：使用zip压缩, tar：使用tar gz压缩
			deleteLocalArchiveAfterDeployment: false, // 部署后删除本地存档, 默认值： true
			archiveName: 'dist.zip', // 压缩后的名称。
		},

		// Environment specific configuration
		environments: {
			nginx: {
				host: '10.10.200.9',
				username: 'benson',
				password: 'kxb13651478554',
				// deployPath 将部署版本的远程服务器上的绝对路径，请勿在此路径中指定currentReleaseLink（或www文件夹）默认就是www下了
				deployPath: '/usr/local/var/',
				// allowRemove: true, // 如果为true，则可以使用removeRelease方法删除远程发布文件夹
				releasesToKeep: 2, // 要保留在远程服务器上的版本数
				// releasesFolder: 'releases', // 包含版本的文件夹的名称。相对于deployPath。
			},
		},
	};
};
