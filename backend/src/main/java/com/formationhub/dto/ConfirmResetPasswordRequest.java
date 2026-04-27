package com.formationhub.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConfirmResetPasswordRequest {

    @NotBlank(message = "Le token de réinitialisation est requis")
    private String token;

    @NotBlank(message = "Le nouveau mot de passe est requis")
    private String newPassword;
}
