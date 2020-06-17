$(function () {
    //加载国际化资源
    i18n(language,initData);
});
var vm ;
var initData=function initData(){
    $("#jqGrid").jqGrid({
        url: '/wallet/user/list',
        datatype: "json",
        method:"POST",
        colModel: [
            { label: 'id', name: 'id', index: "id", width: 45, key: true,hidden:true },
            { label: "钱包地址", name: 'address',index: "address",width: 75 },
            { label: "积分", name: 'coin',index: "address",width: 75 },
            { label: "冻结积分", name: 'coinLocked',index: "address",width: 75 },
            { label: "创建时间", name: 'createTime',index: "address",width: 75 },
            { label: "删除时间", name: 'deleteTime',index: "address",width: 75 },
            { label: "通证余额", name: 'dlsc',index: "address",width: 75 },
            { label: "冻结通证", name: 'dlscLocked',index: "address",width: 75 },
            { label: "钱包地址", name: 'expireTime',index: "address",width: 75 },
            { label: "钱包密码", name: 'password',index: "address",width: 75 },
            { label: "状态", name: 'state', width: 80, formatter: function(value, options, row){
                    return value == 0 ?
                        '<span class="label label-danger">停用</span>' :
                        '<span class="label label-success">启用</span>';
                }},
            { label: "创建日期", name: 'updateTime', width: 100 },
            { label: "到了么用户id", name: 'userId', width: 100 },
            { label: "昵称", name: 'name', width: 100 }
        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList : [10,30,50],
        rownumWidth: 25,
        autowidth:true,
        multiselect: true,
        altRows:true,
        altclass:'someClass',
        pager: "#jqGridPager",
        jsonReader : {
            root: "data",
            page: "currPage",
            total: "totalPage",
            records: "totalCount"
        },
        prmNames : {
        },
        gridComplete:function(){
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
        }
    });
}

vm = new Vue({
    el:'#rrapp',
    data:{
        q:{
            name: null
        },
        panel: "list",
        title:null,
        roleList:{},
        demo:{
            id: null,
            state: null,
            name: null
        }
    },
    methods: {
        query: function () {
            vm.reload();
        },
        reload: function () {
            vm.panel = "list";
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData: vm.q,
                page:page
            }).trigger("reloadGrid");
        }
    }
});
changSt = function(userId,status){
    var msg=jQuery.i18n.prop("sure.disable.user");
    if(status=="1"){
        msg=jQuery.i18n.prop("sure.enable.user");
    }
    vm.user.userId=userId;
    vm.user.status=status;
    confirm(msg, function(){
        $.ajax({
            type: "POST",
            url: baseURL + "demo/changSt",
            contentType: "application/json",
            data: JSON.stringify(vm.user),
            success: function(r){
                if(r.resultCode ==  S_OK){
                    alert(jQuery.i18n.prop('success.tip'), function(){
                        vm.reload();
                    });
                }else{
                    alert(r.resultMsg);
                }
            }
        });
    });
}





