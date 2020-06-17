package com.example.wallet.manage.service.impl;

import com.example.wallet.manage.entity.UserWalletInfo;
import com.example.wallet.manage.mapper.SysMenuMapper;
import com.example.wallet.manage.mapper.UserWalletInfoMapper;
import com.example.wallet.manage.request.UserWalletInfoRequest;
import com.example.wallet.manage.service.WalletUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class WalletUserServiceImpl implements WalletUserService {
    @Resource
    UserWalletInfoMapper userWalletInfoMapper;
    @Override
    public List<UserWalletInfo> list(UserWalletInfoRequest userWalletInfoRequest) {
        return userWalletInfoMapper.list(userWalletInfoRequest);
    }

    @Override
    public int count(UserWalletInfoRequest userWalletInfoRequest) {
        return userWalletInfoMapper.count(userWalletInfoRequest);
    }
}
