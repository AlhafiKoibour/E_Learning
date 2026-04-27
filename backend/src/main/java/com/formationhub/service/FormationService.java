package com.formationhub.service;

import com.formationhub.dto.FormationDTO;
import com.formationhub.dto.LessonDTO;
import com.formationhub.dto.ModuleDTO;
import com.formationhub.entity.Formation;
import com.formationhub.entity.Module;
import com.formationhub.exception.ResourceNotFoundException;
import com.formationhub.repository.FormationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FormationService {

    private final FormationRepository formationRepository;

    @Transactional(readOnly = true)
    @Cacheable("formations")
    public Page<FormationDTO> getAllFormations(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return formationRepository.findAll(pageable)
                .map(this::mapToDTO);
    }

    @Transactional(readOnly = true)
    public FormationDTO getFormationById(Long id) {
        Formation formation = formationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Formation non trouvée"));
        return mapToDTO(formation);
    }

    @Transactional(readOnly = true)
    public Page<FormationDTO> searchFormations(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return formationRepository.findByTitleContainingIgnoreCase(keyword, pageable)
                .map(this::mapToDTO);
    }

    @Transactional(readOnly = true)
    public Page<FormationDTO> getFormationsByDomain(String domain, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return formationRepository.findByDomain(domain, pageable)
                .map(this::mapToDTO);
    }

    @Transactional(readOnly = true)
    public Page<FormationDTO> getFormationsByLevel(String level, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Formation.Level enumLevel = Formation.Level.valueOf(level.toUpperCase());
        return formationRepository.findByLevel(enumLevel, pageable)
                .map(this::mapToDTO);
    }

    @Transactional(readOnly = true)
    public List<FormationDTO> getActiveFormations() {
        return formationRepository.findByIsActiveTrue()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public FormationDTO createFormation(FormationDTO dto) {
        Formation formation = mapToEntity(dto);
        Formation saved = formationRepository.save(formation);
        return mapToDTO(saved);
    }

    @Transactional
    public FormationDTO updateFormation(Long id, FormationDTO dto) {
        Formation formation = formationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Formation non trouvée"));
        formation.setTitle(dto.getTitle());
        formation.setDescription(dto.getDescription());
        formation.setDomain(dto.getDomain());
        formation.setLevel(dto.getLevel() != null ? Formation.Level.valueOf(dto.getLevel().toUpperCase()) : null);
        formation.setDurationWeeks(dto.getDuration());
        formation.setPrice(dto.getPrice());
        formation.setImage(dto.getImage());
        formation.setRating(dto.getRating());
        formation.setReviewsCount(dto.getReviews());
        formation.setParticipantsCount(dto.getParticipants());
        formation.setMode(dto.getMode() != null ? Formation.FormationMode.valueOf(dto.getMode().toUpperCase()) : null);
        formation.setIsActive(dto.getIsActive());
        formation.setObjectives(joinList(dto.getObjectives()));
        formation.setPrerequisites(joinList(dto.getPrerequisites()));
        formation.setIncludes(joinList(dto.getIncludes()));
        formation.setWhatYouWillLearn(dto.getWhatYouWillLearn());
        return mapToDTO(formationRepository.save(formation));
    }

    @Transactional
    public void deleteFormation(Long id) {
        if (!formationRepository.existsById(id)) {
            throw new RuntimeException("Formation non trouvée");
        }
        formationRepository.deleteById(id);
    }

    private FormationDTO mapToDTO(Formation formation) {
        return FormationDTO.builder()
                .id(formation.getId())
                .title(formation.getTitle())
                .description(formation.getDescription())
                .domain(formation.getDomain())
                .level(formation.getLevel() != null ? formation.getLevel().name() : null)
                .duration(formation.getDurationWeeks())
                .price(formation.getPrice())
                .image(formation.getImage())
                .rating(formation.getRating())
                .reviews(formation.getReviewsCount())
                .participants(formation.getParticipantsCount())
                .mode(formation.getMode() != null ? formation.getMode().name() : null)
                .isActive(formation.getIsActive())
                .createdAt(formation.getCreatedAt())
                .objectives(splitList(formation.getObjectives()))
                .prerequisites(splitList(formation.getPrerequisites()))
                .includes(splitList(formation.getIncludes()))
                .whatYouWillLearn(formation.getWhatYouWillLearn())
                .modules(formation.getModules() != null ? formation.getModules().stream()
                        .map(this::mapModuleToDTO)
                        .collect(Collectors.toList()) : Collections.emptyList())
                .build();
    }

    private Formation mapToEntity(FormationDTO dto) {
        Formation formation = new Formation();
        formation.setTitle(dto.getTitle());
        formation.setDescription(dto.getDescription());
        formation.setDomain(dto.getDomain());
        formation.setLevel(dto.getLevel() != null ? Formation.Level.valueOf(dto.getLevel().toUpperCase()) : null);
        formation.setDurationWeeks(dto.getDuration());
        formation.setPrice(dto.getPrice());
        formation.setImage(dto.getImage());
        formation.setRating(dto.getRating());
        formation.setReviewsCount(dto.getReviews());
        formation.setParticipantsCount(dto.getParticipants());
        formation.setMode(dto.getMode() != null ? Formation.FormationMode.valueOf(dto.getMode().toUpperCase()) : null);
        formation.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true);
        formation.setObjectives(joinList(dto.getObjectives()));
        formation.setPrerequisites(joinList(dto.getPrerequisites()));
        formation.setIncludes(joinList(dto.getIncludes()));
        formation.setWhatYouWillLearn(dto.getWhatYouWillLearn());
        return formation;
    }

    private ModuleDTO mapModuleToDTO(Module module) {
        return ModuleDTO.builder()
                .id(module.getId())
                .title(module.getTitle())
                .description(module.getDescription())
                .orderIndex(module.getOrderIndex())
                .durationHours(module.getDurationHours())
                .formationId(module.getFormation() != null ? module.getFormation().getId() : null)
                .createdAt(module.getCreatedAt())
                .lessons(Collections.emptyList())
                .build();
    }

    private List<String> splitList(String values) {
        if (values == null || values.isBlank()) {
            return Collections.emptyList();
        }
        return Arrays.stream(values.split("[\r\n,;]+"))
                .map(String::trim)
                .filter(value -> !value.isBlank())
                .collect(Collectors.toList());
    }

    private String joinList(List<String> values) {
        if (values == null || values.isEmpty()) {
            return null;
        }
        return String.join("\n", values);
    }
}
