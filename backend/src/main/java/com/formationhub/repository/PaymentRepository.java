package com.formationhub.repository;

import com.formationhub.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByEnrollment_LearnerId(Long learnerId);
    Optional<Payment> findByTransactionId(String transactionId);
    Optional<Payment> findByEnrollmentId(Long enrollmentId);
}
