package com.example.wallet.manage.service;

import com.example.wallet.manage.entity.SysMenu;
import com.example.wallet.manage.entity.SysMenuData;

import java.util.List;

public interface SysMenuService {
    List<SysMenuData> getMenu(SysMenu sysMenu);
}
