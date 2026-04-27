package com.formationhub.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectDTO {
    private Long id;
    private String title;
    private String description;
    private String requirements;
    private String submissionGuidelines;
    private Integer durationDays;
    private Integer orderIndex;
    private Long moduleId;
}
