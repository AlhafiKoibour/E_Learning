package com.formationhub.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ModuleDTO {
    private Long id;
    private String title;
    private String description;
    private Integer orderIndex;
    private Integer durationHours;
    private Long formationId;
    private LocalDateTime createdAt;
    private List<LessonDTO> lessons;
}
