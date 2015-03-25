/*zbj-T*/

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var fs   = require('fs');
var spritesmith = require('gulp.spritesmith');

var livereload  = require('gulp-livereload');

var scriptsPath = './';//root path

gulp.task('default',function(){
	console.log(path);
	console.log(fs);
});

//init file path collection
var  paths = {
	sprites:['**/sprite/*.png','**/sprite/*.jpg','!node_modules/**/*'],
	liveDir:['**/*','!node_modules/**/*'],
	ignoreDir:["node_modules",".git",".svn"]
}

function getFolders(dir){
	return fs.readdirSync(dir)
		.filter(function(file){
			var isDir = fs.statSync(path.join(dir,file));
			return isDir.isDirectory() && paths.ignoreDir.indexOf(file)==-1;
		});
}

//生成专题目录sprite文件下的雪碧图
gulp.task('zbj-sprite',function(){
	var folders = getFolders(scriptsPath);
	var tasks = folders.map(function(folder){
		console.log("正在生成"+folder+"目录的sprite");
		var spritefolder = folder+"/sprite/*.*";
		var spriteData = 
			gulp.src(spritefolder).pipe(spritesmith({
				imgName:'zbjsprite.png',
				cssName:'zbjsprite.css',
				imgPath:'../image/zbjsprite.png',
				cssVarMap:function(sprite){
					sprite.name = "zbj-"+sprite.name;
				}
			}));
		//输出到对应目录
		spriteData.img.pipe(gulp.dest(folder+"/image/"));
		spriteData.css.pipe(gulp.dest(folder+"/css/"));
	});
});

//动态监听页面改变自动刷新
//需要下载livereload插件比安装http-server服务
//step1:google store搜索livereload插件
//step2:安装gulp-livereload
//step3:windows下貌似apache自带http-server服务
//step4:启动chrome插件livereload
var target = paths.liveDir;
gulp.task('reload',function(){
	gulp.src(target).pipe(livereload());
});
gulp.task('zbjlive',function(){
	livereload.listen();
	gulp.watch(target,['reload']);
});