package pl.coderslab.charity.donation;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.http11.filters.IdentityInputFilter;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import pl.coderslab.charity.category.Category;
import pl.coderslab.charity.category.ICategoryRepository;
import pl.coderslab.charity.institution.IInstitutionRepository;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class DonationController {

    private final ICategoryRepository iCategoryRepository;
    private final IInstitutionRepository iInstitutionRepository;
    private final IDonationRepository iDonationRepository;

    @GetMapping("/form")
    public String openForm(Model model){
        model.addAttribute("donation", new Donation());
        return "form";
    }

    @PostMapping("/addDonation")
    @ResponseBody
    public String getDonationDetails(@Valid Donation donation, BindingResult result){
        if(result.hasErrors()){
//            return "index";
            return result.toString();
        } else {
            iDonationRepository.save(donation);
            return "form-confirmation";
        }
    }

    @ModelAttribute
    public void categories(Model model){
        model.addAttribute("categories", iCategoryRepository.findAll());
    }

    @ModelAttribute
    public void institutions(Model model){
        model.addAttribute("institutions", iInstitutionRepository.findAll());
    }

}
