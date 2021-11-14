package pl.coderslab.charity.donation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IDonationRepository extends JpaRepository<Donation, Long> {

    @Query("SELECT SUM(quantity) FROM Donation")
    Long getTotalQuantity();
}
