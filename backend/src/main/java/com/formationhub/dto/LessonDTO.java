package com.formationhub.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LessonDTO {
    private Long id;
    private String title;
    private String description;
    private String videoUrl;
    private String documentUrl;
    private Integer duration;
    private Boolean completed;
    private Integer orderIndex;
    private List<ResourceDTO> resources;
    private List<Long> moduleIds;
}
