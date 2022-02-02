package com.charts.charts.Controller;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;

@Data
public class Incomes {

    private Integer id;
    private LocalDate date;
    private HashMap<String, BigDecimal> incomes;

    public Incomes(LocalDate date, HashMap<String, BigDecimal> incomes) {
        this.date = date;
        this.incomes = incomes;
    }
}
