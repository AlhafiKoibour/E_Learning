package com.formationhub.controller;

import com.formationhub.dto.EnrollmentDTO;
import com.formationhub.service.EnrollmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enrollments")
@RequiredArgsConstructor
@Tag(name = "Enrollments", description = "API des inscriptions")
@SecurityRequirement(name = "bearer-jwt")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @PostMapping("/formations/{formationId}")
    @PreAuthorize("hasRole('LEARNER')")
    @Operation(summary = "S'inscrire à une formation", description = "Inscrire l'utilisateur actuel à une formation")
    public ResponseEntity<EnrollmentDTO> enrollInFormation(@PathVariable Long formationId) {
        EnrollmentDTO enrollment = enrollmentService.enrollInFormation(formationId);
        return ResponseEntity.status(HttpStatus.CREATED).body(enrollment);
    }

    @GetMapping
    @PreAuthorize("hasRole('LEARNER')")
    @Operation(summary = "Mes inscriptions", description = "Récupérer toutes les inscriptions de l'utilisateur actuel")
    public ResponseEntity<List<EnrollmentDTO>> getUserEnrollments() {
        List<EnrollmentDTO> enrollments = enrollmentService.getUserEnrollments();
        return ResponseEntity.ok(enrollments);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('LEARNER')")
    @Operation(summary = "Détail d'une inscription", description = "Récupérer les informations d'une inscription")
    public ResponseEntity<EnrollmentDTO> getEnrollment(@PathVariable Long id) {
        EnrollmentDTO enrollment = enrollmentService.getEnrollment(id);
        return ResponseEntity.ok(enrollment);
    }

    @PutMapping("/{id}/progress")
    @PreAuthorize("hasRole('LEARNER')")
    @Operation(summary = "Mettre à jour la progression", description = "Mettre à jour le pourcentage de progression")
    public ResponseEntity<?> updateProgress(
            @PathVariable Long id,
            @RequestParam Integer progress) {
        enrollmentService.updateProgress(id, progress);
        return ResponseEntity.ok("{\"message\": \"Progression mise à jour\"}");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('LEARNER')")
    @Operation(summary = "Annuler une inscription", description = "Annuler une inscription à une formation")
    public ResponseEntity<?> cancelEnrollment(@PathVariable Long id) {
        enrollmentService.cancelEnrollment(id);
        return ResponseEntity.ok("{\"message\": \"Inscription annulée\"}");
    }

    @GetMapping("/{id}/cohorte")
    @PreAuthorize("hasRole('LEARNER')")
    @Operation(summary = "Cohorte de l'inscription", description = "Récupérer la cohorte associée à une inscription")
    public ResponseEntity<?> getEnrollmentCohort(@PathVariable Long id) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentCohort(id));
    }
}
