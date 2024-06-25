package com.medicare.medicare.controller;

import com.medicare.medicare.dto.ReqRes;
import com.medicare.medicare.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UserController {
    @Autowired
    private UsersService usersService;

    @PostMapping("/register")
    public ResponseEntity<ReqRes> register(@RequestBody ReqRes reg){
        try {
            ReqRes response = usersService.register(reg);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            ReqRes response = new ReqRes();
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes req) {
        try {
            ReqRes response = usersService.login(req);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ReqRes response = new ReqRes();
            response.setStatusCode(401);
            response.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<ReqRes> getProfile(@RequestHeader("Authorization") String token) {
        String userEmail = usersService.extractEmailFromToken(token);
        ReqRes profile = usersService.getProfileByEmail(userEmail);
        profile.setStatusCode(200);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    public ResponseEntity<ReqRes> updateProfile(@RequestBody ReqRes profileDto, @RequestHeader("Authorization") String token) {
        String userEmail = usersService.extractEmailFromToken(token);
        ReqRes newProfile = usersService.updateProfile(userEmail, profileDto);
        return ResponseEntity.ok(newProfile);
    }
}
