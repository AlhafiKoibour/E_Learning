package com.formationhub.repository;

import com.formationhub.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByModuleIdOrderByOrderIndex(Long moduleId);
}
