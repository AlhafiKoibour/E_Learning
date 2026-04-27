package com.formationhub.service;

import com.formationhub.dto.LessonDTO;
import com.formationhub.dto.ResourceDTO;
import com.formationhub.entity.Lesson;
import com.formationhub.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LessonService {

    private final LessonRepository lessonRepository;

    @Transactional(readOnly = true)
    public List<LessonDTO> getLessonsByModule(Long moduleId) {
        return lessonRepository.findByModuleIdOrderByOrderIndex(moduleId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public LessonDTO getLessonById(Long id) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leçon non trouvée"));
        return mapToDTO(lesson);
    }

    private LessonDTO mapToDTO(Lesson lesson) {
        return LessonDTO.builder()
                .id(lesson.getId())
                .title(lesson.getTitle())
                .description(lesson.getDescription())
                .videoUrl(lesson.getVideoUrl())
                .duration(lesson.getDurationMinutes())
                .orderIndex(lesson.getOrderIndex())
                .completed(false)
                .resources(buildResources(lesson))
                .moduleId(lesson.getModule() != null ? lesson.getModule().getId() : null)
                .build();
    }

    private List<ResourceDTO> buildResources(Lesson lesson) {
        if (lesson.getDocumentUrl() == null || lesson.getDocumentUrl().isBlank()) {
            return Collections.emptyList();
        }
        return List.of(ResourceDTO.builder()
                .name("Document de cours")
                .url(lesson.getDocumentUrl())
                .build());
    }
}
