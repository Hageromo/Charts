package com.charts.charts.Config;

import com.charts.charts.Domain.UserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {


    private final UserService userService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth)throws Exception{
        auth.userDetailsService(userService);
    }

    @Override
    protected void configure(HttpSecurity http)throws Exception{
        http.csrf().disable().authorizeHttpRequests().antMatchers("/add","/auth", "/rest/all", "/rest/{user}",
                        "/rest/add", "/rest/add/incomes/{user}", "/rest/add/outcomes/{user}", "/rest/delete/{user}",
                        "/rest/update/out/{user}/{id}", "/rest/update/in/{user}/{id}", "/rest/delete/in/{user}/{id}",
                        "/rest/delete/out/{user}/{id}", "/rest/{user}/in", "/rest/{user}/out", "/rest/{user}/out/month",
                        "/rest/{user}/in/month", "/rest/{user}/out/year", "/rest/{user}/in/year", "/rest/{user}/incomes",
                        "/rest/{user}/outcomes", "/rest/{user}/outcomes/month", "/rest/{user}/incomes/month", "/rest/{user}/outcomes/year",
                        "/rest/{user}/incomes/year", "/rest/{user}/unique/incomes", "/rest/{user}/unique/outcomes", "/rest/{user}/incomes/all",
                        "/rest/{user}/outcomes/all", "/rest/{user}/incomes/{id}", "/rest/{user}/outcomes/{id}")
        .permitAll().anyRequest().authenticated();

//        http.authorizeHttpRequests().anyRequest().permitAll();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return NoOpPasswordEncoder.getInstance();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }


}
