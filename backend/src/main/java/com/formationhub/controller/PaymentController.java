package com.formationhub.controller;

import com.formationhub.dto.PaymentDTO;
import com.formationhub.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
@Tag(name = "Payments", description = "API des paiements")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/initialize/{enrollmentId}")
    @Operation(summary = "Initialiser le paiement", description = "Créer une commande de paiement pour une inscription")
    public ResponseEntity<PaymentDTO> initializePayment(@PathVariable Long enrollmentId) {
        return ResponseEntity.ok(paymentService.initializePayment(enrollmentId));
    }

    @PostMapping("/confirm/{transactionId}")
    @Operation(summary = "Confirmer le paiement", description = "Confirmer un paiement existant")
    public ResponseEntity<PaymentDTO> confirmPayment(
            @PathVariable String transactionId,
            @RequestBody Map<String, Object> body) {
        String method = (String) body.getOrDefault("method", "CARD");
        Double amount = body.get("amount") instanceof Number ? ((Number) body.get("amount")).doubleValue() : null;
        return ResponseEntity.ok(paymentService.confirmPayment(transactionId, method, amount));
    }

    @GetMapping("/history")
    @Operation(summary = "Historique des paiements", description = "Récupérer l'historique des paiements de l'utilisateur connecté")
    public ResponseEntity<List<PaymentDTO>> getPaymentHistory() {
        return ResponseEntity.ok(paymentService.getPaymentHistory());
    }
}
