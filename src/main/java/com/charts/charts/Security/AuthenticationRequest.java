package com.charts.charts.Security;

import lombok.Data;

@Data
public class AuthenticationRequest {

    private String userName;
    private String password;
    private String email;

}
