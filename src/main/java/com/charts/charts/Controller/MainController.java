package com.charts.charts.Controller;

import com.charts.charts.Domain.*;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/rest")
@CrossOrigin("*")   //Don't do that
public class MainController {

    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping("/all")
    public List<User> allUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/{user}")
    public User user(@PathVariable String user){
        return userRepository.findByUserName(user);
    }

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestBody User user){
        try {
            User newUser = userService.addUser(user);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/add/incomes/{user}")
    public ResponseEntity<User> addIncomes(@PathVariable String user,@RequestBody Incomes datas){
        try {
            User newUser = userService.addIncomes(datas, userRepository.findByUserName(user));
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add/outcomes/{user}")
    public ResponseEntity<User> addOutcomes(@PathVariable String user,@RequestBody Outcomes datas){
        try {
            User newUser = userService.addOutcomes(datas, userRepository.findByUserName(user));
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/delete/{user}")
    public ResponseEntity<User> deleteUser(@PathVariable String user){
        try {
            userRepository.delete(userRepository.findByUserName(user));
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("update/out/{user}/{id}")
    public ResponseEntity<User> changeValueOutcomes(@PathVariable String user,@PathVariable int id, @RequestBody Outcomes datas){

        try{
            User newUser = userService.updateUserOutcomes(userRepository.findByUserName(user), datas, id);
            return new ResponseEntity<>(newUser, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("update/in/{user}/{id}")
    public ResponseEntity<User> changeValueIncomes(@PathVariable String user,@PathVariable int id, @RequestBody Incomes datas){

        try{
            User newUser = userService.updateUserIncomes(userRepository.findByUserName(user), datas, id);
            return new ResponseEntity<>(newUser, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/in/{user}/{id}")
    public ResponseEntity<User> deleteUserIncome(@PathVariable String user,@PathVariable int id){
        try {
            User newUser = userService.deleteIncomes(userRepository.findByUserName(user), id);
            return new ResponseEntity<>(newUser,HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/delete/out/{user}/{id}")
    public ResponseEntity<User> deleteUserOutcome(@PathVariable String user,@PathVariable int id){
        try {
            User newUser = userService.deleteOutcomes(userRepository.findByUserName(user), id);
            return new ResponseEntity<>(newUser,HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/{user}/in")
    public List<Incomes> getIncomesByDate(@PathVariable String user, @RequestParam(name = "date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){

        User myUser = userRepository.findByUserName(user);

        return userService.findIncomesByDay(myUser, date);
    }

    @GetMapping("/{user}/out")
    public List<Outcomes> getOutcomesByDate(@PathVariable String user, @RequestParam(name = "date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){

        User myUser = userRepository.findByUserName(user);

        return userService.findOutcomesByDay(myUser, date);
    }

    @GetMapping("/{user}/out/month")
    public List<Outcomes> getOutcomesByMonth(@PathVariable String user, @RequestParam(name = "date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
        User myUser = userRepository.findByUserName(user);
        return userService.findOutcomesByMonth(myUser, date);
    }

    @GetMapping("/{user}/in/month")
    public List<Incomes> getIncomesByMonth(@PathVariable String user, @RequestParam(name = "date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
        User myUser = userRepository.findByUserName(user);
        return userService.findIncomesByMonth(myUser, date);
    }

    @GetMapping("/{user}/out/year")
    public List<Outcomes> getOutcomesByYear(@PathVariable String user, @RequestParam(name = "date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
        User myUser = userRepository.findByUserName(user);
        return userService.findOutcomesByYear(myUser, date);
    }

    @GetMapping("/{user}/in/year")
    public List<Incomes> getIncomesByYear(@PathVariable String user, @RequestParam(name = "date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
        User myUser = userRepository.findByUserName(user);
        return userService.findIncomesByYear(myUser, date);
    }


    @GetMapping("/{user}/incomes")
    public BigDecimal sumOfIncomes(@PathVariable String user) throws Exception {

        try {
            User myUser = userRepository.findByUserName(user);
            return userService.sumOfIncomes(myUser);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{user}/outcomes")
    public BigDecimal sumOfOutcomes(@PathVariable String user) throws Exception {

        try {
            User myUser = userRepository.findByUserName(user);
            return userService.sumOfOutcomes(myUser);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{user}/outcomes/month")
    public BigDecimal sumOfOutcomesByMonth(@PathVariable String user, @RequestParam(name = "date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) throws Exception {

        try {
            User myUser = userRepository.findByUserName(user);
            return userService.sumOutcomesByMonth(myUser, date);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{user}/incomes/month")
    public BigDecimal sumOfIncomesByMonth(@PathVariable String user, @RequestParam(name = "date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) throws Exception {

        try {
            User myUser = userRepository.findByUserName(user);
            return userService.sumIncomesByMonth(myUser, date);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{user}/outcomes/year")
    public BigDecimal sumOfOutcomesByYear(@PathVariable String user, @RequestParam(name = "date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) throws Exception {

        try {
            User myUser = userRepository.findByUserName(user);
            return userService.sumOutcomesByYear(myUser, date);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{user}/incomes/year")
    public BigDecimal sumOfIncomesByYear(@PathVariable String user, @RequestParam(name = "date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) throws Exception {

        try {
            User myUser = userRepository.findByUserName(user);
            return userService.sumIncomesByYear(myUser, date);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

}
