package pl.coderslab.charity.donation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import pl.coderslab.charity.category.ICategoryRepository;
import pl.coderslab.charity.institution.IInstitutionRepository;

import javax.validation.Valid;

@Controller
@RequiredArgsConstructor
public class DonationController {

    private final ICategoryRepository iCategoryRepository;
    private final IInstitutionRepository iInstitutionRepository;
    private final IDonationRepository iDonationRepository;

    @GetMapping("/giveDonation")
    public String openForm(Model model) {
        model.addAttribute("donation", new Donation());
        return "giveDonation";
    }

    @PostMapping("/addDonation")
    public String getDonationDetails(@Valid Donation donation, BindingResult result) {
        if (result.hasErrors()) {
            return "index";
        }

        iDonationRepository.save(donation);
        return "donation-confirmation";
    }

    @ModelAttribute
    public void categories(Model model) {
        model.addAttribute("categories", iCategoryRepository.findAll());
    }

    @ModelAttribute
    public void institutions(Model model) {
        model.addAttribute("institutions", iInstitutionRepository.findAll());
    }

}
