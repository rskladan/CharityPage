package pl.coderslab.charity.donation;

import lombok.Data;
import pl.coderslab.charity.category.Category;
import pl.coderslab.charity.institution.Institution;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "donation")
@Data
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(1)
    private Integer quantity;

    @ManyToMany
    private List<Category> categories;

    @ManyToOne
    private Institution institution;

    @Size(min = 2, message = "Street name too short")
    private String street;

    @Size(min = 2, message = "City name too short")
    private String city;

    @Size(min = 5, max = 6, message = "Wrong zip code")
    private String zipCode;

//    wrocic do LocalDate
    private String pickUpDate;
    private String pickUpTime;
    private String pickUpComment;
}
