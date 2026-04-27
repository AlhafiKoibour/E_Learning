package com.formationhub.service;

import com.formationhub.dto.ModuleDTO;
import com.formationhub.entity.Module;
import com.formationhub.repository.LessonRepository;
import com.formationhub.repository.ModuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModuleService {

    private final ModuleRepository moduleRepository;
    private final LessonRepository lessonRepository;

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

    private ModuleDTO mapToDTO(Module module) {
        return ModuleDTO.builder()
                .id(module.getId())
                .title(module.getTitle())
                .description(module.getDescription())
                .orderIndex(module.getOrderIndex())
                .durationHours(module.getDurationHours())
                .formationId(module.getFormation() != null ? module.getFormation().getId() : null)
                .createdAt(module.getCreatedAt())
                .lessons(lessonRepository.findByModuleIdOrderByOrderIndex(module.getId())
                        .stream()
                        .map(lesson -> com.formationhub.dto.LessonDTO.builder()
                                .id(lesson.getId())
                                .title(lesson.getTitle())
                                .description(lesson.getDescription())
                                .videoUrl(lesson.getVideoUrl())
                                .duration(lesson.getDurationMinutes())
                                .orderIndex(lesson.getOrderIndex())
                                .moduleId(module.getId())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }
}
