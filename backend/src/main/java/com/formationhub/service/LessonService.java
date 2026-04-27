package com.formationhub.service;

import com.formationhub.dto.LessonDTO;
import com.formationhub.dto.ResourceDTO;
import com.formationhub.entity.Lesson;
import com.formationhub.repository.LessonRepository;
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
        lesson = lessonRepository.save(lesson);
        // Note: modules are managed from Module side
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
        // Note: modules are managed from Module side
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
        return LessonDTO.builder()
                .id(lesson.getId())
                .title(lesson.getTitle())
                .description(lesson.getDescription())
                .videoUrl(lesson.getVideoUrl())
                .duration(lesson.getDurationMinutes())
                .orderIndex(lesson.getOrderIndex())
                .completed(false)
                .resources(buildResources(lesson))
                .moduleIds(Collections.emptyList())
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
        // Note: module needs to be set
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
