package model

import "github.com/golang-jwt/jwt/v5"

// LoginRequest Struct
type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// AuthResponse Struct
type AuthResponse struct {
	Token   string `json:"token"`
	Message string `json:"message"`
}

// JwtClaims Struct
type JwtClaims struct {
	jwt.RegisteredClaims
}