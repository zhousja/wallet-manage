package com.example.wallet.manage.tool;

public  class ResponsePage {
    private Integer code;

    private Object data;

    private String msg;

    private Integer currPage=1;

    private Integer totalPage=1;

    private Integer totalCount=1;

    public ResponsePage(Integer code,Object data,String msg,Integer currPage,Integer totalPage,Integer totalCount){
        this.code=code;
        this.data=data;
        this.msg=msg;
        this.currPage=currPage;
        this.totalPage=totalPage;
        this.totalCount=totalCount;

    }
    public ResponsePage(Integer code,String msg){
        this.code=code;
        this.msg=msg;

    }
    public static ResponsePage ok(){
        return new ResponsePage(200,"ok");
    }
    public static ResponsePage ok(Object data,String msg,Integer currPage,Integer totalPage,Integer totalCount){
        return new ResponsePage(200,data,msg,currPage,totalPage,totalCount);
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Integer getCurrPage() {
        return currPage;
    }

    public void setCurrPage(Integer currPage) {
        this.currPage = currPage;
    }

    public Integer getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(Integer totalPage) {
        this.totalPage = totalPage;
    }

    public Integer getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(Integer totalCount) {
        this.totalCount = totalCount;
    }
}
