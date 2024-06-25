package com.medicare.medicare.service;

import com.medicare.medicare.dto.ReqRes;
import com.medicare.medicare.entity.User;
import com.medicare.medicare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    @Autowired
    private UserRepository usersRepo;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public ReqRes register(ReqRes registrationRequest){
        ReqRes resp = new ReqRes();
        try {
            User ourUser = new User();
            ourUser.setEmail(registrationRequest.getEmail());
            ourUser.setFirstName(registrationRequest.getFirstName());
            ourUser.setLastName(registrationRequest.getLastName());
            ourUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            User ourUsersResult = usersRepo.save(ourUser);

            if (ourUsersResult.getId() > 0) {
                resp.setUser(ourUsersResult);
                resp.setMessage("User Saved Successfully");
                resp.setStatusCode(201);
            } else {
                throw new RuntimeException("User registration failed");
            }
        } catch (Exception e) {
            throw new RuntimeException("User registration failed: " + e.getMessage());
        }
        return resp;
    }


    public ReqRes login(ReqRes loginRequest){
        ReqRes response = new ReqRes();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(), loginRequest.getPassword()));
            var user = usersRepo.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);

            response.setStatusCode(200);
            response.setToken(jwt);
            response.setExpirationTime("24Hrs");
            response.setMessage("Successfully Logged In");
        } catch (AuthenticationException e) {
            throw new RuntimeException("Bad credentials");
        }
        return response;
    }

    public ReqRes getProfileByEmail(String email) {
        
        User user = usersRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        ReqRes profile = new ReqRes();

        profile.setIdNumber(user.getIdNumber());
        profile.setPhoneNumber(user.getPhoneNumber());
        profile.setBirthday(user.getBirthday());
        profile.setAddress(user.getAddress());
        profile.setNationality(user.getNationality());
        profile.setEducationLevel(user.getEducationLevel());
        profile.setMaritalStatus(user.getMaritalStatus());

        profile.setStatusCode(200);
        return profile;
    }

    public ReqRes updateProfile(String email, ReqRes reqData) {

        User user = usersRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        ReqRes resp = new ReqRes();

        user.setIdNumber(reqData.getIdNumber());
        user.setPhoneNumber(reqData.getPhoneNumber());
        user.setBirthday(reqData.getBirthday());
        user.setAddress(reqData.getAddress());
        user.setNationality(reqData.getNationality());
        user.setEducationLevel(reqData.getEducationLevel());
        user.setMaritalStatus(reqData.getMaritalStatus());

        User newUser = usersRepo.save(user);
        resp.setUser(newUser);
        resp.setStatusCode(200);
        return resp;
    }

    public String extractEmailFromToken(String token) {
        return jwtUtils.extractUsername(token.replace("Bearer ", ""));
    }
}
