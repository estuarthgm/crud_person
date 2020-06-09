package com.bytesw.crud.bs.service.impl;

import com.bytesw.crud.bs.dao.PersonRepository;
import com.bytesw.crud.bs.service.CrudService;
import com.bytesw.crud.eis.bo.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CrudServiceImpl implements CrudService {

    private final PersonRepository personRepository;

    @Autowired
    public CrudServiceImpl(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    public List<Person> listPersons() {
        List<Person> panas = personRepository.findAll();
        return panas;
    }

    @Override
    public Person getPersonById(int id) {
        return personRepository.findOne(id);
    }

    @Override
    public void createPerson(int id, String name, String lastName, String birthday) {
        Person person = new Person();
        person.setName(name);
        person.setLastName(lastName);
        person.setId(id);
        person.setBirthday(birthday);
        personRepository.save(person);
    }

    @Override
    public void deletePerson(int id) {
        personRepository.delete(id);
    }

    @Override
    public void updatePerson(int id, String name, String lastName) {
        Person person = personRepository.findOne(id);
        person.setName(name);
        person.setLastName(lastName);
        personRepository.save(person);
    }
}
