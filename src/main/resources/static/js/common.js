//jqGrid的配置信息
$.jgrid.defaults.width = 1000;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';
var S_OK = '200';
//工具集合Tools
window.T = {};

// 获取请求参数
// 使用示例
// location.href = http://localhost/index.html?id=123
// T.p('id') --> 123;
var url = function(name) {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
};
T.p = url;

//请求前缀
var baseURL = "/";

//登录token
var token = sessionStorage.getItem("token");
// if(token == null || token == 'null'){
//     if (location.href.indexOf("login") < 0) {
//         toLoginPage();
//     }
// }


//输入校验正则表达式
var reg_userAccount = /\w+/;
var  reg_password = /[A-Za-z0-9~!@#$%^&*]{6,20}/;
var reg_email = /[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+/;
var reg_phone = /^[1]\d{10}$/;
var reg_int = /\d+/;
var reg_float = /(-?\d+)(\.\d+)?/;
var reg_ip = /^((([1]\d{0,2})|(\d{1,2})|(([2][0-4]\d)|([2][5][0-5])))\.){3}(([1]\d{0,2})|(\d{1,2})|(([2][0-4]\d)|([2][5][0-5])))$/;
var reg_code=/^\w{2,32}$/;


function toLoginPage() {
    var ppage = parent.location.href;
    var index = ppage.indexOf("?");
    if(index>0 ){
        ppage = ppage.substr(0,index)
    }
   parent.location.href = baseURL + 'login.html';
}
//国际化
function i18n(language,callBack){
	jQuery.i18n.properties({
	    name:'messages', 
	    path:baseURL+"i18n/", 
	    mode:'both',
	    language:language,
        checkAvailableLanguages: true,
        async: true,
	    callback: function() {
	    	callBack();
	    }
	});
}

//jquery全局配置
$.ajaxSetup({
	dataType: "json",
	cache: false,
    headers: {
        "token": token
    },
    complete: function(xhr) {
        //token过期，则跳转到登录页面
        if (!$.isEmptyObject(xhr.responseJSON)) {
            //console.log(xhr.responseJSON)
            if(xhr.responseJSON.code == 'OPS-606'||xhr.responseJSON.code == 'OPS-612'){
                toLoginPage();//parent.location.href = baseURL + 'login.html';
            }
        }
    }
});

//jqgrid全局配置
$.extend($.jgrid.defaults, {
    ajaxGridOptions : {
        headers: {
            "token": token
        }
    }
});

//权限判断
function hasPermission(permission) {
    // if (window.top.permissions.indexOf(permission) > -1) {
    //     return true;
    // } else {
    //     return false;
    // }
}

//重写alert
window.alert = function(msg, callback){
	parent.layer.alert(msg, function(index){
		parent.layer.close(index);
		if(typeof(callback) === "function"){
			callback("ok");
		}
	});
}

//重写confirm式样框
window.confirm = function(msg, callback){
	parent.layer.confirm(msg, {btn: ['确定','取消']},
	function(){//确定事件
		if(typeof(callback) === "function"){
			callback("ok");
		}
	});
}

//选择一条记录
function getSelectedRow() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if(!rowKey){
        alert("请选择一条记录");
    	return ;
    }
    
    var selectedIDs = grid.getGridParam("selarrrow");
    if(selectedIDs.length > 1){
        alert("请选择一条记录");
    	return ;
    }
    
    return selectedIDs[0];
}

//选择多条记录
function getSelectedRows() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if(!rowKey){
        alert("请选择一条记录");
    	return ;
    }
    
    return grid.getGridParam("selarrrow");
}

//选择多条记录
/*function getSelectedRows(grid, must) {
    if (typeof must === "undefined") {
        must = true;
    }
    var grid = $(grid);
    var rowKey = grid.getGridParam("selrow");
    if(must && !rowKey){
        alert("请选择一条记录");
        return ;
    }

    return grid.getGridParam("selarrrow");
}*/


Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

 operLanDiago  = function(flag){
    if(flag){
        $("#languages").show();
    }else{
        $("#languages").hide();
    }
}

function changLang(lan){
    if(window.location.search==""){
        window.location.href=(window.location.href)+"?lang="+lan;
        $.cookie('OPS_lang', lan);
    }else{
        if((window.location.href).indexOf('lang=')>0){
            var url=changeUrlArg(window.location.href,"lang",lan);
            window.location.href=url;
        }else{
            window.location.href=(window.location.href)+"&lang="+lan;
        }
        $.cookie('OPS_lang', lan);
    }
}

function changeUrlArg(url, arg, val){
    var pattern = arg+'=([^&]*)';
    var replaceText = arg+'='+val;
    return url.match(pattern) ? url.replace(eval('/('+ arg+'=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url+'&'+replaceText : url+'?'+replaceText);
}

getTraffic = function(bytes){
     return parseInt(bytes/1048576);
}

// 对象深度复制
function deepCopy(obj) {
    let str, newobj;
    str = newobj = obj instanceof Array ? [] : {};
    if (typeof obj !== "object") {
        return;
    } else if (window.JSON) {
        str = JSON.stringify(obj); // 系列化对象
        newobj = JSON.parse(str); // 还原
    } else {
        for (var i in obj) {
            newobj[i] = typeof obj[i] === "object" ? _deepCopy(obj[i]) : obj[i];
        }
    }
    return newobj;
}

/**
 * 加载下拉框
 * @param id 输入ID
 * @param title 标题
 * @param url ajax url
 * @param keyField 下拉框option key
 * @param valueFields 下拉框optino values
 * @param onSelect 选择事件
 * @param split 多个值分隔符
 */
function initSelect(option) {
    $("#" + option.id).selectpicker({
        noneSelectedText: option.title
    });
    $('#select_'+ option.id +' input[type=text]').unbind();
    $('#select_'+ option.id +' button').click(function (e) {
        if (option.onClick && !option.onClick.call(this)) {
            return
        }
        if ($('#' + option.id).val() == null || $('#' + option.id).val() == "") {
            if ($('#select_'+ option.id +' .dropdown-menu').css("display") == 'none') {
                if (option.beforeRequest) {
                    option.url = option.beforeRequest.call();
                }
                setTimeout(loadSelect(option), 1000);
                $('#' + option.id).selectpicker('refresh');
            }
        }
    });
    $('#select_' + option.id + ' input[type=text]').keyup(function () {
        if (option.beforeRequest) {
            option.url = option.beforeRequest.call(this);
        }
        setTimeout(loadSelect(option), 1000);
        $('#' + option.id).selectpicker('refresh');
    });

    $('#' + option.id).on('changed.bs.select',function(e,a){
        if (option.onSelect) {
            option.onSelect.call(this, e.target.value);
        }
    });
}
function loadSelect(option) {
    var val = $('#select_'+ option.id +' input[type=text]').val();
    if(val == undefined || val == null){
        val = "";
    }
    $.ajax({
        type : "get",
        async : false, //同步执行
        url : option.url + val,
        dataType : "json", //返回数据形式为json
        success : function(result) {
            if (result.successful) {
                $("#" + option.id).empty();
                var datas =  result.data;
                $("#" + option.id).append("<option value=''>" + option.title + "</option>");
                $.each(datas, function (index,item) {
                    var value = item[option.valueField];
                    var text = "";
                    option.split = option.split ? option.split : "-"
                    if ($.isArray(option.textFields)) {
                        for (var i=0; i<option.textFields.length; i++) {
                            if (i > 0) {
                                text += option.split;
                            }
                            text += item[option.textFields[i]];
                        }
                    } else {
                        text = item[option.textFields];
                    }
                    $("#" + option.id).append("<option value='" + value + "'>" + text + "</option>");
                })

            }
        }
    });
}

function initColumnMenu(id) {
    var columns = $("#" + id).jqGrid('getGridParam','colModel');
    if (columns ) {
        var html = "";
        var index = 1;
        for (var i=0; i<columns.length; i++) {
            var column = columns[i];
            if (column.colmenu && column.name != "opt") {
                html +='<li role="menuitem"><label style="font-weight: 500"><input onchange="changeColumn(\''+ id +'\', this)" type="checkbox" data-field="' + column.name + '" value="' + index + '" checked="checked">&nbsp;' + column.label + '</label></li>';
                index ++;
            }
        }
        $("#columnMenu .keep-open ul.dropdown-menu").append(html)
    }
}
function changeColumn(id, el) {
    // 显示隐藏列
    var checked = $(el).is(":checked");
    var name = $(el).attr("data-field");
    if (checked) {
        $("#" + id).setGridParam().showCol(name);
    } else {
        $("#" + id).setGridParam().hideCol(name);
    }
    $("#" + id).setGridWidth($(window).width());

    // 至少保留一个列
    var checkeds = $("#columnMenu .keep-open ul.dropdown-menu :checked")
    if (checkeds.length == 1) {
        checkeds.attr("disabled", true);
    } else if (checkeds.length > 1) {
        var disableds = $("#columnMenu .keep-open ul.dropdown-menu :disabled")
        if (disableds.length > 0) {
            disableds.attr("disabled", false);
        }
    }
}