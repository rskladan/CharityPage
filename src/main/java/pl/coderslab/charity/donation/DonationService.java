package pl.coderslab.charity.donation;

import org.springframework.stereotype.Service;

@Service
public class DonationService {

    private final IDonationRepository iDonationRepository;

    public DonationService(IDonationRepository iDonationRepository) {
        this.iDonationRepository = iDonationRepository;
    }

    public Donation saveDonation(Donation donation){
        return iDonationRepository.save(donation);
    }
}
