package com.formationhub.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentConfirmationRequest {

    @NotBlank(message = "Le mode de paiement est requis")
    private String method;

    @NotNull(message = "Le montant est requis")
    private Double amount;
}
