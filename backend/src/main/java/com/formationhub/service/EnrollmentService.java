package com.formationhub.service;

import com.formationhub.dto.EnrollmentDTO;
import com.formationhub.entity.Enrollment;
import com.formationhub.entity.Formation;
import com.formationhub.entity.User;
import com.formationhub.repository.EnrollmentRepository;
import com.formationhub.repository.FormationRepository;
import com.formationhub.repository.UserRepository;
import com.formationhub.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final FormationRepository formationRepository;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public EnrollmentDTO enrollInFormation(Long formationId) {
        Long userId = jwtTokenProvider.getCurrentUserId();
        User learner = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        Formation formation = formationRepository.findById(formationId)
                .orElseThrow(() -> new RuntimeException("Formation non trouvée"));

        // Vérifier que l'utilisateur n'est pas déjà inscrit
        if (enrollmentRepository.findByLearnerIdAndFormationId(userId, formationId).isPresent()) {
            throw new RuntimeException("Vous êtes déjà inscrit à cette formation");
        }

        Enrollment enrollment = Enrollment.builder()
                .learner(learner)
                .formation(formation)
                .status(Enrollment.EnrollmentStatus.PENDING)
                .progressPercentage(0)
                .build();

        enrollment = enrollmentRepository.save(enrollment);
        log.info("Nouvel inscription: User {} Formation {}", userId, formationId);

        return mapToDTO(enrollment);
    }

    @Transactional(readOnly = true)
    public List<EnrollmentDTO> getUserEnrollments() {
        Long userId = jwtTokenProvider.getCurrentUserId();
        return enrollmentRepository.findByLearnerId(userId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EnrollmentDTO getEnrollment(Long enrollmentId) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Inscription non trouvée"));
        return mapToDTO(enrollment);
    }

    @Transactional
    public void updateProgress(Long enrollmentId, Integer progressPercentage) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Inscription non trouvée"));
        
        enrollment.setProgressPercentage(progressPercentage);
        enrollment.setLastAccessedAt(LocalDateTime.now());
        
        if (progressPercentage >= 100) {
            enrollment.setStatus(Enrollment.EnrollmentStatus.COMPLETED);
            enrollment.setCompletedAt(LocalDateTime.now());
        }
        
        enrollmentRepository.save(enrollment);
    }

    @Transactional
    public void cancelEnrollment(Long enrollmentId) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Inscription non trouvée"));
        enrollment.setStatus(Enrollment.EnrollmentStatus.CANCELLED);
        enrollmentRepository.save(enrollment);
    }

    @Transactional(readOnly = true)
    public com.formationhub.dto.CohortDTO getEnrollmentCohort(Long enrollmentId) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Inscription non trouvée"));

        if (enrollment.getCohort() == null) {
            return null;
        }

        return com.formationhub.dto.CohortDTO.builder()
                .id(enrollment.getCohort().getId())
                .name(enrollment.getCohort().getName())
                .startDate(enrollment.getCohort().getStartDate())
                .endDate(enrollment.getCohort().getEndDate())
                .trainerId(enrollment.getCohort().getTrainer() != null ? enrollment.getCohort().getTrainer().getId() : null)
                .formationId(enrollment.getCohort().getFormation() != null ? enrollment.getCohort().getFormation().getId() : null)
                .build();
    }

    private EnrollmentDTO mapToDTO(Enrollment enrollment) {
        return EnrollmentDTO.builder()
                .id(enrollment.getId())
                .status(enrollment.getStatus().name())
                .progressPercentage(enrollment.getProgressPercentage())
                .enrolledAt(enrollment.getEnrolledAt())
                .completedAt(enrollment.getCompletedAt())
                .lastAccessedAt(enrollment.getLastAccessedAt())
                .learnerId(enrollment.getLearner().getId())
                .formationId(enrollment.getFormation().getId())
                .cohortId(enrollment.getCohort() != null ? enrollment.getCohort().getId() : null)
                .build();
    }
}
