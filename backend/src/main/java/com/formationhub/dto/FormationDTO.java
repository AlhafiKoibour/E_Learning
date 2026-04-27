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
public class FormationDTO {
    private Long id;
    private String title;
    private String description;
    private String domain;
    private String level;
    private Integer duration;
    private Double price;
    private String image;
    private Double rating;
    private Integer reviews;
    private Integer participants;
    private String mode;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private List<String> objectives;
    private List<String> prerequisites;
    private List<String> includes;
    private String whatYouWillLearn;
    private List<ModuleDTO> modules;
}
