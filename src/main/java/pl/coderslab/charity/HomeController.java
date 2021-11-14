package pl.coderslab.charity;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.coderslab.charity.donation.IDonationRepository;
import pl.coderslab.charity.institution.IInstitutionRepository;
import pl.coderslab.charity.institution.Institution;

import java.util.List;


@Controller
@RequiredArgsConstructor
public class HomeController {

    private final IInstitutionRepository institutionRepository;
    private final IDonationRepository iDonationRepository;

    @RequestMapping("/")
    public String homeAction(Model model) {
        List<Institution> institutionList = institutionRepository.findAll();
        Long totalQuantity = iDonationRepository.getTotalQuantity();
        if (totalQuantity == null) {
            totalQuantity = 0L;
        }
        long quantityOfDonations = iDonationRepository.count();
        model.addAttribute("institutionList", institutionList);
        model.addAttribute("totalQuantity", totalQuantity);
        model.addAttribute("quantityOfDonations", quantityOfDonations);
        return "index";
    }
}
