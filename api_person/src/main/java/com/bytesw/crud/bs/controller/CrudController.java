package com.bytesw.crud.bs.controller;

import com.bytesw.crud.bs.service.CrudService;
import com.bytesw.crud.eis.bo.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api")
public class CrudController {

    private final CrudService crudService;

    @Autowired
    public CrudController(CrudService crudService) {
        this.crudService = crudService;
    }

    @GetMapping("/show")
    public Iterable<Person> getAll(){
        Iterable<Person> panas = crudService.listPersons();
        return panas;
    }

    @GetMapping("/one")
    public Person getOneById(@RequestParam("id") int id){
        return crudService.getPersonById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Person person){
        Person p = crudService.getPersonById(person.getId());
        if(p == null){
            if( person.getName() == null || person.getLastName() == null || person.getBirthday() == null ){
                return new ResponseEntity("All the arguments are required", HttpStatus.INTERNAL_SERVER_ERROR);
            }else{
                crudService.createPerson(person.getId(), person.getName(), person.getLastName(), person.getBirthday());
                return new ResponseEntity(HttpStatus.OK);
            }
        }else{
            return new ResponseEntity("This id is already on the db", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteById(@RequestParam("id") int id){
        crudService.deletePerson(id);
        return new ResponseEntity<String>(HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateById(@RequestParam("id") int id, @RequestBody Person person){
        Person p = crudService.getPersonById(id);
        if(p == null){
            return new ResponseEntity("this id is not on the db", HttpStatus.INTERNAL_SERVER_ERROR);
        }else{
            if(person.getName() == null || person.getLastName() == null){
                return new ResponseEntity("All the arguments are required", HttpStatus.INTERNAL_SERVER_ERROR);
            }else{
                crudService.updatePerson(id, person.getName(), person.getLastName());
                return new ResponseEntity(HttpStatus.OK);
            }

        }
    }
}
