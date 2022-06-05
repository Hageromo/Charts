package com.charts.charts.Domain;

import com.charts.charts.Document.Incomes;
import com.charts.charts.Document.User;

import java.math.BigDecimal;

public class IncomesLogic {

    public BigDecimal sumOfIncomes(User user){

        BigDecimal sumOfIncomes = user.getIncomes().stream()
                .map(Incomes::getValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);


        return sumOfIncomes;
    }
}
