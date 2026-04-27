package com.formationhub.controller;

import com.formationhub.dto.FormationDTO;
import com.formationhub.dto.UserDTO;
import com.formationhub.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "API profil utilisateur")
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    @Operation(summary = "Profil utilisateur", description = "Récupérer le profil de l'utilisateur connecté")
    public ResponseEntity<UserDTO> getProfile() {
        return ResponseEntity.ok(userService.getProfile());
    }

    @PutMapping("/profile")
    @Operation(summary = "Mettre à jour le profil", description = "Mettre à jour les informations du profil utilisateur")
    public ResponseEntity<UserDTO> updateProfile(@RequestBody UserDTO profile) {
        return ResponseEntity.ok(userService.updateProfile(profile));
    }

    @PostMapping("/change-password")
    @Operation(summary = "Changer le mot de passe", description = "Modifier le mot de passe de l'utilisateur connecté")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> payload) {
        userService.changePassword(payload.get("oldPassword"), payload.get("newPassword"));
        return ResponseEntity.ok("Mot de passe mis à jour");
    }

    @GetMapping("/formations")
    @Operation(summary = "Mes formations", description = "Récupérer les formations de l'utilisateur connecté")
    public ResponseEntity<List<FormationDTO>> getMyFormations() {
        return ResponseEntity.ok(userService.getMyFormations());
    }

    @GetMapping("/progress/{formationId}")
    @Operation(summary = "Progression de formation", description = "Récupérer la progression pour une formation")
    public ResponseEntity<Integer> getProgress(@PathVariable Long formationId) {
        return ResponseEntity.ok(userService.getProgress(formationId));
    }

    // Admin endpoints
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Lister tous les utilisateurs", description = "Récupérer tous les utilisateurs (Admin seulement)")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Détail d'un utilisateur", description = "Récupérer les informations d'un utilisateur (Admin seulement)")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Mettre à jour un utilisateur", description = "Mettre à jour un utilisateur (Admin seulement)")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO dto) {
        return ResponseEntity.ok(userService.updateUser(id, dto));
    }

    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Supprimer un utilisateur", description = "Supprimer un utilisateur (Admin seulement)")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("Utilisateur supprimé");
    }
}
