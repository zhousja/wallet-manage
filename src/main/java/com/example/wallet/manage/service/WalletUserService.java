package com.example.wallet.manage.service;

import com.example.wallet.manage.entity.UserWalletInfo;
import com.example.wallet.manage.request.UserWalletInfoRequest;

import java.util.List;

public interface WalletUserService {
    List<UserWalletInfo> list(UserWalletInfoRequest userWalletInfoRequest);
    int count(UserWalletInfoRequest userWalletInfoRequest);
}
