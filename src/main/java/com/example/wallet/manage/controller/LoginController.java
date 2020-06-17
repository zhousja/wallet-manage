package com.example.wallet.manage.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.wallet.manage.entity.SysMenu;
import com.example.wallet.manage.entity.SysMenuData;
import com.example.wallet.manage.mapper.SysMenuMapper;
import com.example.wallet.manage.mapper.SysUserMapper;
import com.example.wallet.manage.service.SysMenuService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
public class LoginController {
    @Resource
    SysUserMapper sysUserMapper;
    @Resource
    SysMenuService sysMenuService;

    @GetMapping("/")
    public  String login(){
        return "/login.html";
    }

    @PostMapping("sys/login")
    @ResponseBody
    public JSONObject sysLogin(){
        JSONObject json=new JSONObject();
        json.put("data",sysUserMapper.selectByPrimaryKey(1));
        json.put("code",200);
        return json;
    }
    @GetMapping("sys/menu/user")
    @ResponseBody
    public JSONObject sysMenuLogin(){
        JSONObject json=new JSONObject();
        List<SysMenuData> data=sysMenuService.getMenu(new SysMenu());
        json.put("data",data);
        json.put("code",200);
        return json;
    }
}
