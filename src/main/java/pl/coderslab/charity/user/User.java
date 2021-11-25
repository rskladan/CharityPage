package pl.coderslab.charity.user;

import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Entity
@Table(name = "users")
@RequiredArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 3, message = "Imie jest za krótkie")
    @NotEmpty(message = "Imię nie może byc puste")
    private String name;

    @Size(min = 3, message = "Nazwisko jest za krótkie")
    @NotEmpty(message = "Nazwisko nie może byc puste")
    private String surname;

    @NotEmpty(message = "Email nie może być pusty")
    @Email(message = "Niepoprawny email")
    private String email;

    @NotEmpty(message = "Hasło nie może być puste")
    @Size(min = 8, max = 30, message = "Hasło powinno mieć między 8 a 30 znaków")
//    Regex dla hasla ^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$
//    password.matches(pattern)
    private String password;

//    default isAdmin is set to "0"
    private boolean isAdmin;

//    Optional information
    private LocalDate dateOfBirth;
    private String street;
    private String city;
//    regex dla kodu pocztowego /\d{3}[- ]\d{2}/
    private String zipCode;
}