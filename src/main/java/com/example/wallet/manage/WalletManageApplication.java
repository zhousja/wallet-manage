package com.example.wallet.manage;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = "com.example.wallet.manage.mapper",sqlSessionFactoryRef = "sqlSessionFactory")
public class WalletManageApplication {

    public static void main(String[] args) {
        SpringApplication.run(WalletManageApplication.class, args);
    }

}
