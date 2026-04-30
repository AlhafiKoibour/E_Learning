package com.formationhub.service;

import com.formationhub.dto.LessonDTO;
import com.formationhub.dto.ResourceDTO;
import com.formationhub.entity.Lesson;
import com.formationhub.exception.ResourceNotFoundException;
import com.formationhub.repository.LessonRepository;
import com.formationhub.repository.ModuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LessonService {

    private final LessonRepository lessonRepository;
    private final ModuleRepository moduleRepository;

    @Transactional(readOnly = true)
    public List<LessonDTO> getLessonsByModule(Long moduleId) {
        return lessonRepository.findByModuleIdOrderByOrderIndex(moduleId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<LessonDTO> getAllLessons() {
        return lessonRepository.findAll()
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

    @Transactional
    public LessonDTO createLesson(LessonDTO dto) {
        Lesson lesson = mapToEntity(dto);
        // Si moduleIds est fourni, attacher le premier module
        if (dto.getModuleIds() != null && !dto.getModuleIds().isEmpty()) {
            var module = moduleRepository.findById(dto.getModuleIds().get(0))
                    .orElseThrow(() -> new ResourceNotFoundException("Module non trouvé"));
            lesson.setModule(module);
        }
        lesson = lessonRepository.save(lesson);
        return mapToDTO(lesson);
    }

    @Transactional
    public LessonDTO updateLesson(Long id, LessonDTO dto) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leçon non trouvée"));
        lesson.setTitle(dto.getTitle());
        lesson.setDescription(dto.getDescription());
        lesson.setVideoUrl(dto.getVideoUrl());
        lesson.setDurationMinutes(dto.getDuration());
        lesson.setOrderIndex(dto.getOrderIndex());
        lesson.setDocumentUrl(dto.getDocumentUrl());
        // Mettre à jour le module si moduleIds est fourni
        if (dto.getModuleIds() != null && !dto.getModuleIds().isEmpty()) {
            var module = moduleRepository.findById(dto.getModuleIds().get(0))
                    .orElseThrow(() -> new ResourceNotFoundException("Module non trouvé"));
            lesson.setModule(module);
        }
        return mapToDTO(lessonRepository.save(lesson));
    }

    @Transactional
    public void deleteLesson(Long id) {
        if (!lessonRepository.existsById(id)) {
            throw new RuntimeException("Leçon non trouvée");
        }
        lessonRepository.deleteById(id);
    }

    private LessonDTO mapToDTO(Lesson lesson) {
        List<Long> moduleIds = lesson.getModule() != null 
            ? List.of(lesson.getModule().getId())
            : Collections.emptyList();
        return LessonDTO.builder()
                .id(lesson.getId())
                .title(lesson.getTitle())
                .description(lesson.getDescription())
                .videoUrl(lesson.getVideoUrl())
                .duration(lesson.getDurationMinutes())
                .orderIndex(lesson.getOrderIndex())
                .completed(false)
                .resources(buildResources(lesson))
                .moduleIds(moduleIds)
                .build();
    }

    private Lesson mapToEntity(LessonDTO dto) {
        Lesson lesson = new Lesson();
        lesson.setTitle(dto.getTitle());
        lesson.setDescription(dto.getDescription());
        lesson.setVideoUrl(dto.getVideoUrl());
        lesson.setDurationMinutes(dto.getDuration());
        lesson.setOrderIndex(dto.getOrderIndex());
        lesson.setDocumentUrl(dto.getDocumentUrl());
        return lesson;
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
