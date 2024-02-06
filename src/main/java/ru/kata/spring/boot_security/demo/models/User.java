package ru.kata.spring.boot_security.demo.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    @Column(name = "name")
    @NotEmpty(message = "поле не должно быть пустым")
    @Size(min = 2, max = 30, message = "длина должна быть от 2 до 30 символов")
    private String name;
    @Column(name = "surname")
    @NotEmpty(message = "поле не должно быть пустым")
    @Size(min = 2, max = 30, message = "длина должна быть от 2 до 30 символов")
    private String surname;
    @Column(name = "email")
    @NotEmpty(message = "поле не должно быть пустым")
    @Email(message = "должен быть корректный адрес e-mail")
    private String email;

    public User() {}

}
