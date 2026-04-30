package com.formationhub.service;

import com.formationhub.dto.ModuleDTO;
import com.formationhub.entity.Module;
import com.formationhub.exception.ResourceNotFoundException;
import com.formationhub.repository.FormationRepository;
import com.formationhub.repository.ModuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Collections;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModuleService {

    private final ModuleRepository moduleRepository;
    private final FormationRepository formationRepository;

    @Transactional(readOnly = true)
    public List<ModuleDTO> getAllModules() {
        return moduleRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ModuleDTO> getModulesByFormation(Long formationId) {
        return moduleRepository.findByFormationIdOrderByOrderIndex(formationId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ModuleDTO getModuleById(Long id) {
        return moduleRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new RuntimeException("Module non trouvé"));
    }

    @Transactional
    public ModuleDTO createModule(ModuleDTO dto) {
        Module module = mapToEntity(dto);
        if (dto.getFormationId() != null) {
            var formation = formationRepository.findById(dto.getFormationId())
                    .orElseThrow(() -> new ResourceNotFoundException("Formation non trouvée"));
            module.setFormation(formation);
        }
        return mapToDTO(moduleRepository.save(module));
    }

    @Transactional
    public ModuleDTO updateModule(Long id, ModuleDTO dto) {
        Module module = moduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Module non trouvé"));
        module.setTitle(dto.getTitle());
        module.setDescription(dto.getDescription());
        module.setOrderIndex(dto.getOrderIndex());
        module.setDurationHours(dto.getDurationHours());
        return mapToDTO(moduleRepository.save(module));
    }

    @Transactional
    public void deleteModule(Long id) {
        if (!moduleRepository.existsById(id)) {
            throw new RuntimeException("Module non trouvé");
        }
        moduleRepository.deleteById(id);
    }

    private ModuleDTO mapToDTO(Module module) {
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

    private Module mapToEntity(ModuleDTO dto) {
        Module module = new Module();
        module.setTitle(dto.getTitle());
        module.setDescription(dto.getDescription());
        module.setOrderIndex(dto.getOrderIndex());
        module.setDurationHours(dto.getDurationHours());
        return module;
    }
}
