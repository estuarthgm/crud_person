package com.bytesw.crud.bs.dao;

import com.bytesw.crud.eis.bo.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Integer> {
}
