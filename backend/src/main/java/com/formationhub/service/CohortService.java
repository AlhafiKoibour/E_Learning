package com.formationhub.service;

import com.formationhub.dto.CohortDTO;
import com.formationhub.entity.Cohort;
import com.formationhub.exception.ResourceNotFoundException;
import com.formationhub.repository.CohortRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CohortService {

    private final CohortRepository cohortRepository;

    @Transactional(readOnly = true)
    public Page<CohortDTO> getAllCohorts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return cohortRepository.findAll(pageable)
                .map(this::mapToDTO);
    }

    @Transactional(readOnly = true)
    public CohortDTO getCohortById(Long id) {
        Cohort cohort = cohortRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cohorte non trouvée"));
        return mapToDTO(cohort);
    }

    @Transactional
    public CohortDTO createCohort(CohortDTO dto) {
        Cohort cohort = mapToEntity(dto);
        return mapToDTO(cohortRepository.save(cohort));
    }

    @Transactional
    public CohortDTO updateCohort(Long id, CohortDTO dto) {
        Cohort cohort = cohortRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cohorte non trouvée"));
        cohort.setName(dto.getName());
        cohort.setDescription(dto.getDescription());
        cohort.setStartDate(dto.getStartDate());
        cohort.setEndDate(dto.getEndDate());
        cohort.setStatus(dto.getStatus() != null ? Cohort.CohortStatus.valueOf(dto.getStatus().toUpperCase()) : cohort.getStatus());
        cohort.setMaxParticipants(dto.getMaxParticipants());
        return mapToDTO(cohortRepository.save(cohort));
    }

    @Transactional
    public void deleteCohort(Long id) {
        if (!cohortRepository.existsById(id)) {
            throw new RuntimeException("Cohorte non trouvée");
        }
        cohortRepository.deleteById(id);
    }

    private CohortDTO mapToDTO(Cohort cohort) {
        return CohortDTO.builder()
                .id(cohort.getId())
                .name(cohort.getName())
                .description(cohort.getDescription())
                .startDate(cohort.getStartDate())
                .endDate(cohort.getEndDate())
                .status(cohort.getStatus() != null ? cohort.getStatus().name() : null)
                .maxParticipants(cohort.getMaxParticipants())
                .formationId(cohort.getFormation() != null ? cohort.getFormation().getId() : null)
                .trainerId(cohort.getTrainer() != null ? cohort.getTrainer().getId() : null)
                .createdAt(cohort.getCreatedAt())
                .build();
    }

    private Cohort mapToEntity(CohortDTO dto) {
        Cohort cohort = new Cohort();
        cohort.setName(dto.getName());
        cohort.setDescription(dto.getDescription());
        cohort.setStartDate(dto.getStartDate());
        cohort.setEndDate(dto.getEndDate());
        cohort.setStatus(dto.getStatus() != null ? Cohort.CohortStatus.valueOf(dto.getStatus().toUpperCase()) : Cohort.CohortStatus.PLANNING);
        cohort.setMaxParticipants(dto.getMaxParticipants());
        // Note: formation and trainer need to be set by service or controller
        return cohort;
    }
}