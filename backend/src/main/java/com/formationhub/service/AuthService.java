package com.formationhub.service;

import com.formationhub.dto.AuthRequest;
import com.formationhub.dto.AuthResponse;
import com.formationhub.dto.ConfirmResetPasswordRequest;
import com.formationhub.dto.RegisterRequest;
import com.formationhub.dto.RefreshTokenRequest;
import com.formationhub.dto.ResetPasswordRequest;
import com.formationhub.dto.UserDTO;
import com.formationhub.entity.User;
import com.formationhub.exception.ConflictException;
import com.formationhub.exception.ResourceNotFoundException;
import com.formationhub.exception.UnauthorizedException;
import com.formationhub.repository.UserRepository;
import com.formationhub.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthResponse login(AuthRequest request) {
        try {
            log.debug("Tentative de connexion pour l'email: {}", request.getEmail());
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));

            String token = jwtTokenProvider.generateToken(user);
            String refreshToken = jwtTokenProvider.generateRefreshToken(user);

            return AuthResponse.builder()
                    .token(token)
                    .refreshToken(refreshToken)
                    .user(mapToDTO(user))
                    .message("Connexion réussie")
                    .build();
        } catch (Exception e) {
            log.error("Erreur lors de la connexion pour l'email {}: {}", request.getEmail(), e.getMessage());
            throw new UnauthorizedException("Email ou mot de passe invalide");
        }
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("Cet email est déjà utilisé");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .role(User.UserRole.LEARNER)
                .isActive(true)
            .isVerified(true)
                .build();

        user = userRepository.save(user);

        String token = jwtTokenProvider.generateToken(user);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user);

        return AuthResponse.builder()
                .token(token)
                .refreshToken(refreshToken)
                .user(mapToDTO(user))
                .message("Inscription réussie")
                .build();
    }

    public UserDTO getCurrentUser() {
        String email = jwtTokenProvider.getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));
        return mapToDTO(user);
    }

    @Transactional
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        if (!jwtTokenProvider.validateToken(request.getRefreshToken()) || !jwtTokenProvider.isRefreshToken(request.getRefreshToken())) {
            throw new UnauthorizedException("Refresh token invalide ou expiré");
        }

        String email = jwtTokenProvider.getEmailFromToken(request.getRefreshToken());
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));

        String token = jwtTokenProvider.generateToken(user);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user);

        return AuthResponse.builder()
                .token(token)
                .refreshToken(refreshToken)
                .user(mapToDTO(user))
                .message("Token rafraîchi avec succès")
                .build();
    }

    @Transactional
    public String resetPassword(ResetPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));

        String resetToken = jwtTokenProvider.generatePasswordResetToken(user);
        // TODO: envoyer le resetToken par email via un service de messagerie
        return resetToken;
    }

    @Transactional
    public String confirmResetPassword(ConfirmResetPasswordRequest request) {
        if (!jwtTokenProvider.validateToken(request.getToken()) || !jwtTokenProvider.isPasswordResetToken(request.getToken())) {
            throw new UnauthorizedException("Token de réinitialisation invalide ou expiré");
        }

        String email = jwtTokenProvider.getEmailFromToken(request.getToken());
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return "Mot de passe réinitialisé avec succès";
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
                .role(user.getRole().name())
                .isActive(user.getIsActive())
                .isVerified(user.getIsVerified())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
