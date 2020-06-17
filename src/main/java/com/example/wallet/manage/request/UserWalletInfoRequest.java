package com.example.wallet.manage.request;

import com.example.wallet.manage.entity.Page;

import java.math.BigDecimal;
import java.util.Date;

public class UserWalletInfoRequest  extends Page {
    private Integer id;

    private String address;

    private BigDecimal coin;

    private BigDecimal coinLocked;

    private Date createTime;

    private Date deleteTime;

    private Integer dlsc;

    private Integer dlscLocked;

    private Date expireTime;

    private String password;

    private Integer status;

    private Date updateTime;

    private String userId;

    private String name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public BigDecimal getCoin() {
        return coin;
    }

    public void setCoin(BigDecimal coin) {
        this.coin = coin;
    }

    public BigDecimal getCoinLocked() {
        return coinLocked;
    }

    public void setCoinLocked(BigDecimal coinLocked) {
        this.coinLocked = coinLocked;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getDeleteTime() {
        return deleteTime;
    }

    public void setDeleteTime(Date deleteTime) {
        this.deleteTime = deleteTime;
    }

    public Integer getDlsc() {
        return dlsc;
    }

    public void setDlsc(Integer dlsc) {
        this.dlsc = dlsc;
    }

    public Integer getDlscLocked() {
        return dlscLocked;
    }

    public void setDlscLocked(Integer dlscLocked) {
        this.dlscLocked = dlscLocked;
    }

    public Date getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(Date expireTime) {
        this.expireTime = expireTime;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
