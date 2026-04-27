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
public class CertificateDTO {
    private Long id;
    private String certificateNumber;
    private LocalDateTime issuedAt;
    private LocalDateTime expirationDate;
    private Long enrollmentId;
}
