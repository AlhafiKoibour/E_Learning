package com.formationhub.controller;

import com.formationhub.dto.CohortDTO;
import com.formationhub.service.CohortService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cohorts")
@RequiredArgsConstructor
@Tag(name = "Cohorts", description = "API des cohortes de formation")
public class CohortController {

    private final CohortService cohortService;

    @GetMapping
    @Operation(summary = "Lister les cohortes", description = "Récupérer toutes les cohortes")
    public ResponseEntity<Page<CohortDTO>> getAllCohorts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<CohortDTO> cohorts = cohortService.getAllCohorts(page, size);
        return ResponseEntity.ok(cohorts);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Détail d'une cohorte", description = "Récupérer les informations d'une cohorte")
    public ResponseEntity<CohortDTO> getCohortById(@PathVariable Long id) {
        CohortDTO cohort = cohortService.getCohortById(id);
        return ResponseEntity.ok(cohort);
    }

    @PostMapping
    @Operation(summary = "Créer une cohorte", description = "Créer une nouvelle cohorte")
    public ResponseEntity<CohortDTO> createCohort(@RequestBody CohortDTO dto) {
        return ResponseEntity.status(201).body(cohortService.createCohort(dto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Mettre à jour une cohorte", description = "Mettre à jour une cohorte existante")
    public ResponseEntity<CohortDTO> updateCohort(@PathVariable Long id, @RequestBody CohortDTO dto) {
        return ResponseEntity.ok(cohortService.updateCohort(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer une cohorte", description = "Supprimer une cohorte")
    public ResponseEntity<?> deleteCohort(@PathVariable Long id) {
        cohortService.deleteCohort(id);
        return ResponseEntity.ok("Cohorte supprimée");
    }
}