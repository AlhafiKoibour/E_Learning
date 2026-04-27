package com.formationhub.service;

import com.formationhub.dto.PaymentDTO;
import com.formationhub.entity.Enrollment;
import com.formationhub.entity.Payment;
import com.formationhub.exception.ResourceNotFoundException;
import com.formationhub.repository.EnrollmentRepository;
import com.formationhub.repository.PaymentRepository;
import com.formationhub.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public PaymentDTO initializePayment(Long enrollmentId) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Inscription non trouvée"));

        Payment payment = Payment.builder()
                .enrollment(enrollment)
                .amount(enrollment.getFormation().getPrice())
                .status(Payment.PaymentStatus.PENDING)
                .method(Payment.PaymentMethod.CARD)
                .transactionId("TXN-" + System.currentTimeMillis())
                .description("Paiement pour inscription à la formation")
                .createdAt(LocalDateTime.now())
                .build();

        payment = paymentRepository.save(payment);
        return mapToDTO(payment);
    }

    @Transactional
    public PaymentDTO confirmPayment(String transactionId, String method, Double amount) {
        Payment payment = paymentRepository.findByTransactionId(transactionId)
                .orElseThrow(() -> new ResourceNotFoundException("Paiement introuvable"));

        payment.setStatus(Payment.PaymentStatus.COMPLETED);
        payment.setMethod(Payment.PaymentMethod.valueOf(method.toUpperCase()));
        payment.setAmount(amount);
        payment.setPaidAt(LocalDateTime.now());
        payment.setUpdatedAt(LocalDateTime.now());

        return mapToDTO(paymentRepository.save(payment));
    }

    @Transactional(readOnly = true)
    public List<PaymentDTO> getPaymentHistory() {
        Long learnerId = jwtTokenProvider.getCurrentUserId();
        return paymentRepository.findByEnrollment_LearnerId(learnerId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private PaymentDTO mapToDTO(Payment payment) {
        return PaymentDTO.builder()
                .id(payment.getId())
                .amount(payment.getAmount())
                .status(payment.getStatus() != null ? payment.getStatus().name() : null)
                .method(payment.getMethod() != null ? payment.getMethod().name() : null)
                .transactionId(payment.getTransactionId())
                .description(payment.getDescription())
                .paidAt(payment.getPaidAt())
                .enrollmentId(payment.getEnrollment() != null ? payment.getEnrollment().getId() : null)
                .createdAt(payment.getCreatedAt())
                .build();
    }
}
