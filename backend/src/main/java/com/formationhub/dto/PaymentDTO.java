package com.formationhub.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDTO {
    private Long id;
    private Double amount;
    private String status;
    private String method;
    private String transactionId;
    private String description;
    private LocalDateTime paidAt;
    private Long enrollmentId;
    private LocalDateTime createdAt;
}
