/**
 * [实现本地 nginx 服务部署功能]
 */
const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'dist'); // 待部署地址
const target = path.join('/usr/local/var/www/skyroam', 'safety-center'); // 服务器地址

const copy = function(source, target) {
	const paths = fs.readdirSync(source); //同步读取当前目录
	paths.forEach(function(path) {
		const _source = `${source}/${path}`;
		const _target = `${target}/${path}`;
		// 获取文件信息
		fs.stat(_source, function(err, stats) {
			//stats  该对象 包含文件属性
			if (err) throw err;
			if (stats.isFile()) {
				//如果是个文件则拷贝
				const readable = fs.createReadStream(_source); //创建读取流
				const writable = fs.createWriteStream(_target); //创建写入流
				readable.pipe(writable);
			} else if (stats.isDirectory()) {
				//是目录则 递归
				checkDirectory(_source, _target, copy);
			}
		});
	});
};

const checkDirectory = function(source, target, callback) {
	// 检查路径是否存在
	fs.access(target, fs.constants.F_OK, err => {
		if (err) {
			// 不存在就创建
			fs.mkdirSync(target); // 同步地创建目录
		}
		try {
			callback(source, target);
		} catch (e) {
			process.exit(500);
		}
	});
};

console.info('开始部署……');
checkDirectory(source, target, copy);
process.on('exit', function(code) {
	if (code === 500) {
		console.error('部署失败,读取文件信息异常(ㄒoㄒ)');
	} else if (code === 0) {
		console.info('部署成功(∩_∩)!');
	} else {
		console.log('部署异常，退出码为:', code);
	}
});
