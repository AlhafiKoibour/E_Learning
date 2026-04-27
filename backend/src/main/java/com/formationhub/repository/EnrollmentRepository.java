package com.formationhub.repository;

import com.formationhub.entity.Enrollment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByLearnerId(Long learnerId);
    List<Enrollment> findByFormationId(Long formationId);
    Optional<Enrollment> findByLearnerIdAndFormationId(Long learnerId, Long formationId);
    Page<Enrollment> findByFormationId(Long formationId, Pageable pageable);
}
