package pl.coderslab.charity.institution;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "institution")
@Data
public class Institution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;
}
