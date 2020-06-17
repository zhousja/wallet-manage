// 刷新
function refreshPage(el) {
    var url = $(el).attr("href").replace('#', '');
    var tag = url.lastIndexOf("?") > 0 ? "&" : "?";
    vm.main = url + tag +"time=" + (new Date().getTime());;
    //导航菜单展开
    $(".treeview-menu li").removeClass("active");
    $("a[href='" + url + "']").parents("li").addClass("active");
    vm.navTitle = $("a[href='" + url + "']").text();
}

var vm = null;
var router = null;
initData = function(){
    var menuItem = Vue.extend({
        name: 'menu-item',
         props:{
            item:{ }
        },
        template:[
            '<li>',
            '<a v-if="item.type === 1" href="javascript:;">',
            '<span>{{item.remark}}</span>',
            '<i class="fa fa-angle-left pull-right"></i>',
            '</a>',
            '<ul v-if="item.type === 1" class="treeview-menu">',
            '<menu-item :item="item" v-for="item in item.list"></menu-item>',
            '</ul>',
            '<a onclick="refreshPage(this)" v-if="item.type === 0" :href="\'#\'+item.url"><i v-else class="far fa-circle"></i> <span> {{item.remark}}</span></a>',
            '</li>'
        ].join('')
    });



//iframe自适应
    $(window).on('resize', function() {
        var $content = $('.content');
        $content.height($(this).height() - 120);
        $content.find('iframe').each(function() {
            $(this).height($content.height());
        });
    }).resize();

//注册菜单组件
    Vue.component('menuItem',menuItem);

    vm = new Vue({
        el:'#rrapp',
        data:{
            user:{},
            menuList:{},
            main:"",
            password:'',
            newPassword:'',
            confirmPwd:'',
            navTitle:"",
            register:{},
            registerParam:{},
            router: null
        },
        methods: {
            func:function(item){
                return jQuery.i18n.prop(item.key);
            },
            getMenuList: function () {
                $.getJSON(baseURL + "sys/menu/user", function(r){
                    vm.menuList = r.data;
                    window.permissions = r.permissions;
                });
            },
            getUser: function(){
                $.getJSON(baseURL + "sys/user/info", function(r){
                    if (!r.successful) {
                        vm.logout();
                    }
                    vm.user = r.data==null ? [] : r.data;
                });
            },
            updatePassword: function(){
                $('#formSelector').bootstrapValidator('resetForm', true);
                $('#rechargeFormSelector').bootstrapValidator('resetForm', true);
                layer.open({
                    type: 1,
                    skin: 'layui-layer-molv',
                    title: jQuery.i18n.prop("title.change.pwd"),
                    area: ['550px', '390px'],
                    shadeClose: false,
                    content: jQuery("#passwordLayer"),
                    btn: [ jQuery.i18n.prop("btn.edit"), jQuery.i18n.prop("btn.cancel")],
                    btn1: function (index) {
                        var bootstrapValidator = $("#formSelector").data('bootstrapValidator');
                        //手动触发验证
                        bootstrapValidator.validate();
                        if (!bootstrapValidator.isValid()) {
                            return;
                        }
                        var data = "password="+vm.password+"&newPassword="+vm.newPassword;
                        $.ajax({
                            type: "POST",
                            url: baseURL + "sys/user/password",
                            data: data,
                            dataType: "json",
                            success: function(r){
                                //console.log(r);
                                if(r.resultCode == S_OK){
                                    layer.close(index);
                                    layer.alert(jQuery.i18n.prop('edit.success'), function(){
                                        location.reload();
                                    });
                                }else{
                                    layer.alert(r.msg);
                                }
                            }
                        });
                    }
                });
            },
            logout: function () {
                //删除本地token
                sessionStorage.removeItem("token");
                //跳转到登录页面
                location.href = baseURL + 'login.html';
            },
            donate: function () {
                layer.open({
                    type: 2,
                    title: false,
                    area: ['806px', '467px'],
                    closeBtn: 1,
                    shadeClose: false,
                    content: ['http://cdn.kaopu.com/donate.jpg', 'no']
                });
            }
        },
        created: function(){
            this.getMenuList();
            this.getUser();
        },
        updated: function(){
           /* //路由
            router = new Router();
            routerList(router, vm.menuList);
            router.start();*/
        }
    });

    function routerList(router, menuList) {
        for (var key in menuList) {
            var menu = menuList[key];
            if (menu.type == 0) {
                routerList(router, menu.list);
            } else if (menu.type == 1) {
                router.add('#' + menu.url, function () {
                    var url = window.location.hash;

                    //替换iframe的url
                    //var tag = url.lastIndexOf("?") > 0 ? "&" : "?";
                    vm.main = url.replace('#', ''); // + tag +"time=" + (new Date().getTime());;

                    //导航菜单展开
                    $(".treeview-menu li").removeClass("active");
                    $("a[href='" + url + "']").parents("li").addClass("active");
                    vm.navTitle = $("a[href='" + url + "']").text();
                });
            }
        }
    }

    function setFirstPage(menuList) {
        if (!menuList) {
            return;
        }
        for (var i=0; i<menuList.length; i++) {
            var menu = menuList[i];
            if (menu.url == "modules/dev/dev_map.html") {
                Vue.set(vm, 'main', menu.url);
                break;
            }
            if (null != menu.list && menu.list.length > 0) {
                setFirstPage(menu.list);
            }
        }
    }

    formValidate= function() {
        $("#formSelector").bootstrapValidator({
            // excluded: [':disabled', ':hidden', ':not(:visible)'],
            excluded: [":disabled"],
            message: jQuery.i18n.prop("invalid.value"),
            fields: {
                password: {
                    validators: {
                        notEmpty: {
                            message: jQuery.i18n.prop("password.empty")
                        }
                    },
                },
                newPassword: {
                    validators: {
                        notEmpty: {
                            message: jQuery.i18n.prop("password.empty")
                        },
                        stringLength: {
                            min: 6,
                            max: 12,
                            message: jQuery.i18n.prop("password.stringlength", 6, 12)
                        },
                        identical: {
                            field: 'confirmPwd',
                            message:  jQuery.i18n.prop('register.password.notSame')
                        }
                    }
                },
                confirmPwd: {
                    validators: {
                        notEmpty: {
                            message: jQuery.i18n.prop('password.empty')
                        },
                        stringLength: {
                            min: 6,
                            max: 12,
                            message: jQuery.i18n.prop("password.stringlength", 6, 12)
                        },
                        identical: {
                            field: 'newPassword',
                            message:  jQuery.i18n.prop('register.password.notSame')
                        }
                    }
                }
            }
        });
    }
    formValidate();
}
i18n(language,initData);

