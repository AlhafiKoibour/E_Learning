package com.formationhub.controller;

import com.formationhub.dto.LessonDTO;
import com.formationhub.dto.ModuleDTO;
import com.formationhub.service.LessonService;
import com.formationhub.service.ModuleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/modules")
@RequiredArgsConstructor
@Tag(name = "Modules", description = "API des modules de formation")
public class ModuleController {

    private final ModuleService moduleService;
    private final LessonService lessonService;

    @GetMapping
    @Operation(summary = "Lister les modules", description = "Récupérer tous les modules")
    public ResponseEntity<List<ModuleDTO>> getAllModules() {
        return ResponseEntity.ok(moduleService.getAllModules());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Détail d'un module", description = "Récupérer les informations d'un module")
    public ResponseEntity<ModuleDTO> getModuleById(@PathVariable Long id) {
        return ResponseEntity.ok(moduleService.getModuleById(id));
    }

    @GetMapping("/{moduleId}/lessons")
    @Operation(summary = "Leçons d'un module", description = "Récupérer toutes les leçons d'un module")
    public ResponseEntity<List<LessonDTO>> getLessonsByModule(@PathVariable Long moduleId) {
        return ResponseEntity.ok(lessonService.getLessonsByModule(moduleId));
    }

    @PostMapping
    @Operation(summary = "Créer un module", description = "Créer un nouveau module")
    public ResponseEntity<ModuleDTO> createModule(@RequestBody ModuleDTO dto) {
        return ResponseEntity.status(201).body(moduleService.createModule(dto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Mettre à jour un module", description = "Mettre à jour un module existant")
    public ResponseEntity<ModuleDTO> updateModule(@PathVariable Long id, @RequestBody ModuleDTO dto) {
        return ResponseEntity.ok(moduleService.updateModule(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un module", description = "Supprimer un module")
    public ResponseEntity<?> deleteModule(@PathVariable Long id) {
        moduleService.deleteModule(id);
        return ResponseEntity.ok("Module supprimé");
    }
}
