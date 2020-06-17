package com.example.wallet.manage.mapper;

import com.example.wallet.manage.entity.SysMenu;
import com.example.wallet.manage.entity.SysMenuData;

import java.util.List;

public interface SysMenuMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SysMenu record);

    int insertSelective(SysMenu record);

    SysMenu selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SysMenu record);

    int updateByPrimaryKey(SysMenu record);
    List<SysMenuData> select(SysMenu sysMenu);
}