package com.charts.charts.Controller;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class Incomes {

    private Integer id;
    private LocalDate date;
    private String incomes;
    private BigDecimal value;

    public Incomes(LocalDate date, String incomes, BigDecimal value) {
        this.date = date;
        this.incomes = incomes;
        this.value = value;
    }
}
