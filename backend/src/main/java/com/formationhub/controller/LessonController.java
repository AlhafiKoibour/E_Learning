package com.formationhub.controller;

import com.formationhub.dto.LessonDTO;
import com.formationhub.service.LessonService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "Lessons", description = "API des leçons de modules")
public class LessonController {

    private final LessonService lessonService;

    @GetMapping("/modules/{moduleId}/lessons")
    @Operation(summary = "Leçons d'un module", description = "Récupérer la liste des leçons d'un module")
    public ResponseEntity<List<LessonDTO>> getLessonsByModule(@PathVariable Long moduleId) {
        return ResponseEntity.ok(lessonService.getLessonsByModule(moduleId));
    }

    @GetMapping("/lessons/{id}")
    @Operation(summary = "Détail d'une leçon", description = "Récupérer les informations d'une leçon")
    public ResponseEntity<LessonDTO> getLessonById(@PathVariable Long id) {
        return ResponseEntity.ok(lessonService.getLessonById(id));
    }
}
