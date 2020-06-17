package com.example.wallet.manage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    @GetMapping("wallet/user")
    public  String wallet_user(){
        return "html/wallet_user.html";
    }
}
