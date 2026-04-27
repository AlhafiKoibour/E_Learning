package com.formationhub.repository;

import com.formationhub.entity.Formation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FormationRepository extends JpaRepository<Formation, Long> {
    Page<Formation> findByDomain(String domain, Pageable pageable);
    Page<Formation> findByLevel(Formation.Level level, Pageable pageable);
    Page<Formation> findByMode(Formation.FormationMode mode, Pageable pageable);
    Page<Formation> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    List<Formation> findByIsActiveTrue();
}
