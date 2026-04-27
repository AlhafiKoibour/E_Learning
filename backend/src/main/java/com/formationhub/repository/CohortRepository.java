package com.formationhub.repository;

import com.formationhub.entity.Cohort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CohortRepository extends JpaRepository<Cohort, Long> {
    List<Cohort> findByFormationId(Long formationId);
    List<Cohort> findByTrainerId(Long trainerId);
}
