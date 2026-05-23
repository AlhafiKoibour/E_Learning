package com.formationhub.service;

import com.formationhub.dto.FormationDTO;
import com.formationhub.dto.UserDTO;
import com.formationhub.entity.Enrollment;
import com.formationhub.entity.Formation;
import com.formationhub.entity.User;
import com.formationhub.exception.BadRequestException;
import com.formationhub.exception.ResourceNotFoundException;
import com.formationhub.repository.EnrollmentRepository;
import com.formationhub.repository.FormationRepository;
import com.formationhub.repository.UserRepository;
import com.formationhub.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final FormationRepository formationRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public UserDTO getProfile() {
        User user = getCurrentUser();
        return mapToDTO(user);
    }

    @Transactional
    public UserDTO updateProfile(UserDTO profile) {
        User user = getCurrentUser();
        user.setFirstName(profile.getFirstName());
        user.setLastName(profile.getLastName());
        user.setPhone(profile.getPhone());
        user.setBio(profile.getBio());
        user.setProfilePicture(profile.getProfilePicture());
        user = userRepository.save(user);
        return mapToDTO(user);
    }

    @Transactional
    public void changePassword(String oldPassword, String newPassword) {
        User user = getCurrentUser();
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new BadRequestException("Mot de passe actuel incorrect");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public List<FormationDTO> getMyFormations() {
        Long userId = getCurrentUser().getId();
        return enrollmentRepository.findByLearnerId(userId)
                .stream()
                .map(Enrollment::getFormation)
                .distinct()
                .map(this::mapFormationToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Integer getProgress(Long formationId) {
        Long userId = getCurrentUser().getId();
        Enrollment enrollment = enrollmentRepository.findByLearnerIdAndFormationId(userId, formationId)
                .orElseThrow(() -> new ResourceNotFoundException("Inscription introuvable"));
        return enrollment.getProgressPercentage();
    }

    @Transactional(readOnly = true)
    public java.util.Map<String, Object> getStats() {
        Long userId = getCurrentUser().getId();
        List<Enrollment> enrollments = enrollmentRepository.findByLearnerId(userId);
        
        int enrollmentCount = enrollments.size();
        double hoursCompleted = enrollments.stream()
                .mapToDouble(e -> e.getFormation().getDurationWeeks() * (e.getProgressPercentage() / 100.0) * 25)
                .sum();
        long certificateCount = enrollments.stream()
                .filter(e -> e.getProgressPercentage() >= 100)
                .count();
        double averageProgress = enrollments.isEmpty() ? 0 : enrollments.stream()
                .mapToDouble(Enrollment::getProgressPercentage)
                .average()
                .orElse(0);
        
        return java.util.Map.of(
                "enrollmentCount", enrollmentCount,
                "hoursCompleted", Math.round(hoursCompleted),
                "certificateCount", certificateCount,
                "averageProgress", Math.round(averageProgress)
        );
    }

    // Admin methods
    @Transactional(readOnly = true)
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));
        return mapToDTO(user);
    }

    @Transactional
    public UserDTO updateUser(Long id, UserDTO dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPhone(dto.getPhone());
        user.setBio(dto.getBio());
        user.setProfilePicture(dto.getProfilePicture());
        user.setIsActive(dto.getIsActive());
        user.setIsVerified(dto.getIsVerified());
        user.setRole(dto.getRole() != null ? User.UserRole.valueOf(dto.getRole().toUpperCase()) : user.getRole());
        user = userRepository.save(user);
        return mapToDTO(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Utilisateur non trouvé");
        }
        userRepository.deleteById(id);
    }

    private User getCurrentUser() {
        Long userId = jwtTokenProvider.getCurrentUserId();
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));
    }

    private UserDTO mapToDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phone(user.getPhone())
                .profilePicture(user.getProfilePicture())
                .bio(user.getBio())
                .role(user.getRole() != null ? user.getRole().name() : null)
                .isActive(user.getIsActive())
                .isVerified(user.getIsVerified())
                .createdAt(user.getCreatedAt())
                .build();
    }

    private FormationDTO mapFormationToDTO(Formation formation) {
        return FormationDTO.builder()
                .id(formation.getId())
                .title(formation.getTitle())
                .description(formation.getDescription())
                .domain(formation.getDomain())
                .level(formation.getLevel() != null ? formation.getLevel().name() : null)
                .duration(formation.getDurationWeeks())
                .price(formation.getPrice())
                .image(formation.getImage())
                .rating(formation.getRating())
                .reviews(formation.getReviewsCount())
                .participants(formation.getParticipantsCount())
                .mode(formation.getMode() != null ? formation.getMode().name() : null)
                .isActive(formation.getIsActive())
                .createdAt(formation.getCreatedAt())
                .build();
    }
}
