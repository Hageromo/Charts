package com.charts.charts.Security;


import com.charts.charts.Document.User;
import com.charts.charts.Repository.UserRepository;
import com.charts.charts.Domain.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")   //Don't do that
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;


    @PostMapping("/add")
    private ResponseEntity<?> addUser(@RequestBody AuthenticationRequest authenticationRequest){
        String userName = authenticationRequest.getUserName();
        String password = authenticationRequest.getPassword();
        String email = authenticationRequest.getEmail();
        User user = new User(userName, password, email);

        try {
           userService.addUser(user);
        }catch (Exception e){
            return  ResponseEntity.ok(new AuthenticationResponse("Nie można dodać użytkownika " + userName));
        }

        return  ResponseEntity.ok(new AuthenticationResponse("Dodano nowego użytkownika " + userName));
    }


    @PostMapping("/auth")
    private ResponseEntity<?> authUser(@RequestBody AuthenticationRequest authenticationRequest){
        String userName = authenticationRequest.getUserName();
        String password = authenticationRequest.getPassword();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, password));

        }catch (Exception e){
            return  ResponseEntity.ok(new AuthenticationResponse("Błędna nazwa użytkownika lub hasło"));
        }

        return  ResponseEntity.ok(new AuthenticationResponse("Użytkownik poprawny"));
    }

}
