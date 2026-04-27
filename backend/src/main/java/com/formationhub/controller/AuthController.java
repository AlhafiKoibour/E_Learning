package com.formationhub.controller;

import com.formationhub.dto.AuthRequest;
import com.formationhub.dto.AuthResponse;
import com.formationhub.dto.ConfirmResetPasswordRequest;
import com.formationhub.dto.RegisterRequest;
import com.formationhub.dto.RefreshTokenRequest;
import com.formationhub.dto.ResetPasswordRequest;
import com.formationhub.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "API d'authentification")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Connexion", description = "Authentifier un utilisateur avec email et mot de passe")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    @Operation(summary = "Inscription", description = "Créer un nouveau compte utilisateur")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/me")
    @Operation(summary = "Utilisateur actuel", description = "Récupérer les informations de l'utilisateur connecté")
    public ResponseEntity<?> getCurrentUser() {
        return ResponseEntity.ok(authService.getCurrentUser());
    }

    @PostMapping("/logout")
    @Operation(summary = "Déconnexion", description = "Déconnecter l'utilisateur")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok("Déconnexion réussie");
    }

    @PostMapping("/refresh")
    @Operation(summary = "Actualiser le token", description = "Renouveler le token JWT")
    public ResponseEntity<AuthResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        AuthResponse response = authService.refreshToken(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset-password")
    @Operation(summary = "Demande de réinitialisation", description = "Envoyer un email de réinitialisation de mot de passe")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        String resetToken = authService.resetPassword(request);
        return ResponseEntity.ok(Map.of(
                "message", "Si l'utilisateur existe, le lien de réinitialisation a été envoyé.",
                "resetToken", resetToken
        ));
    }

    @PostMapping("/confirm-reset-password")
    @Operation(summary = "Confirmer réinitialisation", description = "Valider le jeton de réinitialisation et définir un nouveau mot de passe")
    public ResponseEntity<?> confirmResetPassword(@Valid @RequestBody ConfirmResetPasswordRequest request) {
        String message = authService.confirmResetPassword(request);
        return ResponseEntity.ok(Map.of("message", message));
    }
}
