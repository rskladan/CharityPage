package pl.coderslab.charity.institution;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InstitutionService {

    private final IInstitutionRepository iInstitutionRepository;

    public List<Institution> getInstitutions(){
        return iInstitutionRepository.findAll();
    }
}
