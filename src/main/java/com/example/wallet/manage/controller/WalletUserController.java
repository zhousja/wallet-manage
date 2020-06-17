package com.example.wallet.manage.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.wallet.manage.entity.SysMenu;
import com.example.wallet.manage.entity.SysMenuData;
import com.example.wallet.manage.entity.UserWalletInfo;
import com.example.wallet.manage.request.UserWalletInfoRequest;
import com.example.wallet.manage.service.SysMenuService;
import com.example.wallet.manage.service.WalletUserService;
import com.example.wallet.manage.tool.ResponsePage;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("wallet/user/")
public class WalletUserController {
    @Resource
    WalletUserService walletUserService;
    @GetMapping("list")
    public ResponsePage list(@ModelAttribute UserWalletInfoRequest userWalletInfoRequest){
        List<UserWalletInfo> data=walletUserService.list(userWalletInfoRequest);
        Integer totalCount=walletUserService.count(userWalletInfoRequest);
        Integer currPage=userWalletInfoRequest.getPage();
        Integer totalPage=totalCount/userWalletInfoRequest.getRows();
        if (totalPage*userWalletInfoRequest.getRows()<totalCount){
            totalPage++;
        }
        return ResponsePage.ok(data,"ok",currPage,totalPage,totalCount);
    }
}
