package com.formationhub.controller;

import com.formationhub.dto.ModuleDTO;
import com.formationhub.service.ModuleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/modules")
@RequiredArgsConstructor
@Tag(name = "Modules", description = "API des modules de formation")
public class ModuleController {

    private final ModuleService moduleService;

    @GetMapping("/{id}")
    @Operation(summary = "Détail d'un module", description = "Récupérer les informations d'un module")
    public ResponseEntity<ModuleDTO> getModuleById(@PathVariable Long id) {
        return ResponseEntity.ok(moduleService.getModuleById(id));
    }
}
