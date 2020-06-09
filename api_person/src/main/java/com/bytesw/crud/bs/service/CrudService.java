package com.bytesw.crud.bs.service;

import com.bytesw.crud.eis.bo.Person;

import java.util.Date;
import java.util.List;

public interface CrudService {
    List<Person> listPersons();
    Person getPersonById(int id);
    void createPerson(int id, String name, String lastName, String birthday);
    void deletePerson(int id);
    void updatePerson(int id, String name, String lastName);
}
