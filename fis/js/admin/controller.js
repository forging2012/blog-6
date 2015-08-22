"use strict";

var ueditor_option = {
    toolbars: [
        [
            'source', //源代码
            'forecolor', //字体颜色
            'backcolor', //背景色
            'insertorderedlist', //有序列表
            'insertunorderedlist', //无序列表
            'simpleupload', //单图上传
            '|',
            'justifyleft', //居左对齐
            'justifyright', //居右对齐
            'justifycenter', //居中对齐
            'justifyjustify', //两端对齐
            '|',
            'inserttable', //插入表格
            'fontfamily', //字体
            'fontsize', //字号
            'paragraph', //段落格式
            'insertcode', //代码语言
        ],
        [
            'bold', //加粗
            'italic', //斜体
            'underline', //下划线
            'strikethrough', //删除线
            '|',
            'subscript', //下标
            'fontborder', //字符边框
            'superscript', //上标
            '|',
            'undo', //撤销
            'redo', //重做
            'indent', //首行缩进
            'snapscreen', //截图
            'blockquote', //引用
            'pasteplain', //纯文本粘贴模式
            'selectall', //全选
            'preview', //预览
            'horizontal', //分隔线
            'removeformat', //清除格式
            'time', //时间
            'date', //日期
            'unlink', //取消链接
            'link', //超链接
            'emotion', //表情
            'spechars', //特殊字符
            'searchreplace', //查询替换
            'map', //Baidu地图
            'insertvideo', //视频
            'help', //帮助
            'fullscreen', //全屏
            'edittip ', //编辑提示
            'touppercase', //字母大写
            'tolowercase', //字母小写
            'music', //音乐
            'drafts', // 从草稿箱加载
            'charts', // 图表
        ]
    ],
    initialFrameHeight: 500,
    autoHeightEnabled: false,
    autoFloatEnabled: false
};

function NavsController ($scope, $http, $location) {
	$http.get("/api/admin/navlist",null).success(function (data) {
		$scope.navs = data;
		$scope.currentPath = $location.path().replace("/admin","").replace("/","");
	});
}

function IndexController($scope,$rootScope){
    // console.log("hello index");
    $rootScope.global = {
    	title: "首页",
    	currentPath: ""
    }
}

function NewArticleController($scope,$rootScope){
    $rootScope.global = {
    	title: "添加文章",
    	currentPath: "new_article"
    }
    $scope.config = ueditor_option;
}

function EditArticleController($scope,$rootScope,$routeParams,$http) {
    var id = $routeParams.id || 0;
    $scope.id = parseInt(id);

    $http.get("/api/admin/article/"+id,null).success(function (data) {
        $scope.article = data.data;
    });
    
    $rootScope.global = {
        title: "编辑文章",
        currentPath: "manage_article"
    }
    $scope.config = ueditor_option;
}

function ManageArticleController($http,$scope,$rootScope,$routeParams){
    $rootScope.global = {
    	title: "管理文章",
    	currentPath: "manage_article"
    }
    
    var page = $routeParams.page || 1;
    $http.get("/api/admin/article/page/"+page,null).success(function (data) {
        $scope.articles = data.data;
        $scope.has_next = data.nextPage;
        $scope.page = parseInt(page);
    });
}

function ManageProjectController($scope,$rootScope){
    $rootScope.global = {
    	title: "管理项目",
    	currentPath: "manage_project"
    }
}

function ManageOssController($scope,$rootScope){
    $rootScope.global = {
    	title: "OSS管理",
    	currentPath: "manage_oss"
    }
}


