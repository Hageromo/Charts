package com.charts.charts.domain;

import com.charts.charts.Document.Incomes;
import com.charts.charts.Document.User;
import com.charts.charts.Domain.IncomesLogic;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class IncomesTests {

    @Test
    public void  sumOfIncomesTest() {
        //given
        Incomes incomesOne = new Incomes(LocalDate.parse("2022-02-02"), "Wypłata", new BigDecimal(3000));
        Incomes incomesTwo = new Incomes(LocalDate.parse("2022-03-02"), "Nagroda", new BigDecimal(1000));
        ArrayList<Incomes> incomes = new ArrayList<>();
        incomes.add(incomesOne);
        incomes.add(incomesTwo);

        User user = new User("User", "******", "User@.pl");
        user.setIncomes(incomes);


        IncomesLogic incomesLogic = new IncomesLogic();

        //when
        BigDecimal expectedValue = incomesLogic.sumOfIncomes(user);

        //then
        assertEquals(new BigDecimal(4000), expectedValue);
    }
}
