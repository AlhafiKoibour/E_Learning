package com.formationhub.repository;

import com.formationhub.entity.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, Long> {
    Optional<Certificate> findByEnrollmentId(Long enrollmentId);
    List<Certificate> findByEnrollment_LearnerId(Long learnerId);
}
