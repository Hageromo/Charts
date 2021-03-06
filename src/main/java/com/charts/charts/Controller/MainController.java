package com.charts.charts.Controller;

import com.charts.charts.Document.Incomes;
import com.charts.charts.Document.Outcomes;
import com.charts.charts.Document.User;
import com.charts.charts.Domain.*;
import com.charts.charts.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping("/rest")
@CrossOrigin("http://localhost:3000")   //Don't do that
public class MainController {

    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping("/all")
    public List<User> allUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/{user}/{password}")
    public ResponseEntity<User> user(@PathVariable String user, @PathVariable String password){
        User myUser = userRepository.findByUserName(user);
        if(myUser.getPassword().equals(password)){
            return new ResponseEntity<>(myUser, HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

    @GetMapping("/{user}/unique/incomes")
    public Map<String, BigDecimal> uniqueIncomes(@PathVariable String user) throws Exception {

        try {
            User myUser = userRepository.findByUserName(user);
            return userService.uniqueIncomes(myUser);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{user}/unique/outcomes")
    public Map<String, BigDecimal> uniqueOutcomes(@PathVariable String user) throws Exception {

        try {
            User myUser = userRepository.findByUserName(user);
            return userService.uniqueOutcomes(myUser);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{user}/incomes/all")
    public List<Incomes> usersIncomes(@PathVariable String user) throws Exception {

        try {
            User myUser = userRepository.findByUserName(user);
            return myUser.getIncomes();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{user}/outcomes/all")
    public List<Outcomes> usersOutcomes(@PathVariable String user) throws Exception {

        try {
            User myUser = userRepository.findByUserName(user);
            return myUser.getOutcomes();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{user}/incomes/{id}")
    public Incomes incomesById(@PathVariable String user, @PathVariable int id) throws Exception{
        try{
            User myUser = userRepository.findByUserName(user);
            return myUser.getIncomes().stream().filter(e -> e.getId() == id).findFirst().get();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{user}/outcomes/{id}")
    public Outcomes outcomesById(@PathVariable String user, @PathVariable int id) throws Exception{
        try{
            User myUser = userRepository.findByUserName(user);
            return myUser.getOutcomes().stream().filter(e -> e.getId() == id).findFirst().get();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    //Endpoints that return incomes and outcomes in date order

    @GetMapping({"/data/{user}/incomes/up"})
    public List<Incomes> incomesByDateUp(@PathVariable String user) throws Exception{
        try{
            User myUser = userRepository.findByUserName(user);

            return myUser.getIncomes()
                    .stream()
                    .sorted(Comparator.comparing(Incomes::getDate))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping({"/data/{user}/incomes/down"})
    public List<Incomes> incomesByDateDown(@PathVariable String user) throws Exception{
        try{
            User myUser = userRepository.findByUserName(user);

            return myUser.getIncomes()
                    .stream()
                    .sorted(Comparator.comparing(Incomes::getDate)
                            .reversed())
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping({"/data/{user}/outcomes/up"})
    public List<Outcomes> outcomesByDateUp(@PathVariable String user) throws Exception{
        try{
            User myUser = userRepository.findByUserName(user);

            return myUser.getOutcomes()
                    .stream()
                    .sorted(Comparator.comparing(Outcomes::getDate))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping({"/data/{user}/outcomes/down"})
    public List<Outcomes> outcomesByDateDown(@PathVariable String user) throws Exception{
        try{
            User myUser = userRepository.findByUserName(user);

            return myUser.getOutcomes()
                    .stream()
                    .sorted(Comparator.comparing(Outcomes::getDate)
                            .reversed())
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{user}/in/exact")
    public List<Incomes> getIncomesInDate(@PathVariable String user, @RequestParam(name = "dateSince") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateSince,
    @RequestParam(name = "dateTo") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo) throws Exception{
        User myUser = userRepository.findByUserName(user);
        return userService.findIncomesByExactTime(myUser, dateSince, dateTo);
    }

    @GetMapping("/{user}/out/exact")
    public List<Outcomes> getOutcomesInDate(@PathVariable String user, @RequestParam(name = "dateSince") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateSince,
    @RequestParam(name = "dateTo") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo) throws Exception{
        User myUser = userRepository.findByUserName(user);
        return userService.findOutcomesByExactTime(myUser, dateSince, dateTo);
    }
}
