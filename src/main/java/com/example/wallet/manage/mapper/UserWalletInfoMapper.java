package com.example.wallet.manage.mapper;

import com.example.wallet.manage.entity.UserWalletInfo;
import com.example.wallet.manage.request.UserWalletInfoRequest;

import java.util.List;

public interface UserWalletInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(UserWalletInfo record);

    int insertSelective(UserWalletInfo record);

    UserWalletInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(UserWalletInfo record);

    int updateByPrimaryKey(UserWalletInfo record);

    List<UserWalletInfo> list(UserWalletInfoRequest userWalletInfoRequest);

    int count(UserWalletInfoRequest userWalletInfoRequest);
}