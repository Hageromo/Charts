package com.charts.charts.domain;

import com.charts.charts.Document.Incomes;
import com.charts.charts.Document.User;
import com.charts.charts.Domain.UserService;
import com.charts.charts.Repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class ServiceTests {

    @MockBean
    private UserRepository userRepository;

    @Autowired
    private final UserService userService = new UserService(userRepository);

    @Test
    public void addProperIncomes(){
        //given
        Incomes incomes = new Incomes(LocalDate.parse("2022-02-02"), "Wypłata", new BigDecimal(3000));
        User user = new User("User", "password", "User@.pl");

        //when
        userService.addIncomes(incomes, user);

        //then
        assertTrue(user.getIncomes().contains(incomes));
    }
}
