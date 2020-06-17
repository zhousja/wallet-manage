package com.example.wallet.manage.service.impl;

import com.example.wallet.manage.entity.SysMenu;
import com.example.wallet.manage.entity.SysMenuData;
import com.example.wallet.manage.mapper.SysMenuMapper;
import com.example.wallet.manage.service.SysMenuService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class SysMenuServiceImpl implements SysMenuService {
    @Resource
    SysMenuMapper sysMenuMapper;
    @Override
    public List<SysMenuData> getMenu(SysMenu sysMenu) {
        sysMenu.setLevel(1);
        List<SysMenuData> data= sysMenuMapper.select(sysMenu);
        SysMenu menu=new SysMenu();
        //遍历拿到菜单对象
        for(SysMenuData sysMenuData:data){
            if (sysMenuData.getType()==1){
                menu.setParentId(sysMenuData.getId());
                sysMenuData.setList(getSysMenu(menu));
            }
        }
        return data;
    }
    private  List<SysMenuData> getSysMenu(SysMenu sysMenu){
        List<SysMenuData> list=sysMenuMapper.select(sysMenu);
        //遍历拿到菜单对象
        for(SysMenuData sysMenuData:list){
            //直至叶子层才结束遍历
            if (sysMenuData.getType()==1){
                sysMenu.setParentId(sysMenuData.getId());
                sysMenuData.setList(getSysMenu(sysMenu));
            }
        }
        return list;
    }
}
