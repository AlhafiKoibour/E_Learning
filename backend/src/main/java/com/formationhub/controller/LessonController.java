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
@RequestMapping("/lessons")
@RequiredArgsConstructor
@Tag(name = "Lessons", description = "API des leçons de modules")
public class LessonController {

    private final LessonService lessonService;

    @GetMapping
    @Operation(summary = "Lister les leçons", description = "Récupérer toutes les leçons")
    public ResponseEntity<List<LessonDTO>> getAllLessons() {
        return ResponseEntity.ok(lessonService.getAllLessons());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Détail d'une leçon", description = "Récupérer les informations d'une leçon")
    public ResponseEntity<LessonDTO> getLessonById(@PathVariable Long id) {
        return ResponseEntity.ok(lessonService.getLessonById(id));
    }

    @PostMapping
    @Operation(summary = "Créer une leçon", description = "Créer une nouvelle leçon")
    public ResponseEntity<LessonDTO> createLesson(@RequestBody LessonDTO dto) {
        return ResponseEntity.status(201).body(lessonService.createLesson(dto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Mettre à jour une leçon", description = "Mettre à jour une leçon existante")
    public ResponseEntity<LessonDTO> updateLesson(@PathVariable Long id, @RequestBody LessonDTO dto) {
        return ResponseEntity.ok(lessonService.updateLesson(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer une leçon", description = "Supprimer une leçon")
    public ResponseEntity<?> deleteLesson(@PathVariable Long id) {
        lessonService.deleteLesson(id);
        return ResponseEntity.ok("Leçon supprimée");
    }
}
