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
public class ChangePasswordRequest {

    @NotBlank(message = "Le mot de passe actuel est requis")
    private String oldPassword;

    @NotBlank(message = "Le nouveau mot de passe est requis")
    private String newPassword;
}
