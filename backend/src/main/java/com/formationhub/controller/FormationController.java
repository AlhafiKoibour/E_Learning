package com.formationhub.controller;

import com.formationhub.dto.FormationDTO;
import com.formationhub.dto.ModuleDTO;
import com.formationhub.service.EnrollmentService;
import com.formationhub.service.FormationService;
import com.formationhub.service.ModuleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/formations")
@RequiredArgsConstructor
@Tag(name = "Formations", description = "API des formations")
public class FormationController {

    private final FormationService formationService;
    private final ModuleService moduleService;
    private final EnrollmentService enrollmentService;

    @GetMapping
    @Operation(summary = "Lister les formations", description = "Récupérer toutes les formations")
    public ResponseEntity<Page<FormationDTO>> getAllFormations(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<FormationDTO> formations = formationService.getAllFormations(page, size);
        return ResponseEntity.ok(formations);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Détail d'une formation", description = "Récupérer les informations détaillées d'une formation")
    public ResponseEntity<FormationDTO> getFormationById(@PathVariable Long id) {
        FormationDTO formation = formationService.getFormationById(id);
        return ResponseEntity.ok(formation);
    }

    @GetMapping("/search")
    @Operation(summary = "Rechercher des formations", description = "Rechercher des formations par mot-clé")
    public ResponseEntity<Page<FormationDTO>> searchFormations(
            @RequestParam(required = false, name = "q") String query,
            @RequestParam(required = false, name = "query") String duplicateQuery,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        String effectiveQuery = query != null ? query : duplicateQuery;
        if (effectiveQuery == null || effectiveQuery.isBlank()) {
            return ResponseEntity.ok(formationService.getAllFormations(page, size));
        }
        Page<FormationDTO> formations = formationService.searchFormations(effectiveQuery, page, size);
        return ResponseEntity.ok(formations);
    }

    @GetMapping("/{id}/modules")
    @Operation(summary = "Modules d'une formation", description = "Récupérer les modules d'une formation")
    public ResponseEntity<List<ModuleDTO>> getModulesByFormation(@PathVariable Long id) {
        return ResponseEntity.ok(moduleService.getModulesByFormation(id));
    }

    @PostMapping("/{id}/enroll")
    @PreAuthorize("hasRole('LEARNER')")
    @Operation(summary = "S'inscrire à une formation", description = "Inscrire l'utilisateur actuel à une formation")
    public ResponseEntity<?> enrollInFormation(@PathVariable Long id) {
        return ResponseEntity.status(201).body(enrollmentService.enrollInFormation(id));
    }

    @PostMapping
    @Operation(summary = "Créer une formation", description = "Créer une nouvelle formation")
    public ResponseEntity<FormationDTO> createFormation(@RequestBody FormationDTO dto) {
        return ResponseEntity.status(201).body(formationService.createFormation(dto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Mettre à jour une formation", description = "Mettre à jour une formation existante")
    public ResponseEntity<FormationDTO> updateFormation(@PathVariable Long id, @RequestBody FormationDTO dto) {
        return ResponseEntity.ok(formationService.updateFormation(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer une formation", description = "Supprimer une formation")
    public ResponseEntity<?> deleteFormation(@PathVariable Long id) {
        formationService.deleteFormation(id);
        return ResponseEntity.ok("Formation supprimée");
    }

    @GetMapping("/by-domain/{domain}")
    @Operation(summary = "Formations par domaine", description = "Récupérer les formations d'un domaine spécifique")
    public ResponseEntity<Page<FormationDTO>> getFormationsByDomain(
            @PathVariable String domain,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<FormationDTO> formations = formationService.getFormationsByDomain(domain, page, size);
        return ResponseEntity.ok(formations);
    }

    @GetMapping("/by-level/{level}")
    @Operation(summary = "Formations par niveau", description = "Récupérer les formations d'un niveau spécifique")
    public ResponseEntity<Page<FormationDTO>> getFormationsByLevel(
            @PathVariable String level,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<FormationDTO> formations = formationService.getFormationsByLevel(level, page, size);
        return ResponseEntity.ok(formations);
    }

    @GetMapping("/active")
    @Operation(summary = "Formations actives", description = "Récupérer toutes les formations actives")
    public ResponseEntity<List<FormationDTO>> getActiveFormations() {
        List<FormationDTO> formations = formationService.getActiveFormations();
        return ResponseEntity.ok(formations);
    }
}
