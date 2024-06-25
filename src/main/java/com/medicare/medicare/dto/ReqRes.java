package com.medicare.medicare.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.medicare.medicare.entity.User;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReqRes {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String expirationTime;

    private String firstName;
    private String lastName;
    private String email;
    private String password;

    private String idNumber;
    private String birthday;
    private String phoneNumber;
    private String address;
    private String nationality;
    private String educationLevel;
    private String maritalStatus;

    private User user;
}
