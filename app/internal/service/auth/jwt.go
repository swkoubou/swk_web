package service

// app/internal/service/jwt.go
// * このファイルは JWT を操作するためのメソッドを定義しています。

import (
	"context"
	"net/http"
	"strings"
	"swk-web/internal/config"
	"swk-web/internal/model"
	"sync"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type contextKey string
const UserIDKey contextKey = "userID"

var (
	revokedTokens = make(map[string]time.Time)
	revokedMu     sync.RWMutex
	cleanerOnce   sync.Once
)

// * CreateJWT: JWTを生成します。
func CreateJWT(user model.User, cfg *config.Config) (string, error) {
	claims := jwt.MapClaims {
		"sub": 	user.ID,
		"name": user.Username,
		"exp": 	time.Now().Add(time.Hour * 1).Unix(), 	// - 有効期限（expiration）
		"iat": 	time.Now().Unix(), 						// - 発行日（issued at）
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	result, err := token.SignedString(cfg.Auth.JWTSecret)

	return result, err
}

// * VerifyJWT: JWTを検証します。
func VerifyJWT(token string, cfg *config.Config) (*jwt.Token, error) {
	return jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, model.ErrInvalidToken
		}
		return cfg.Auth.JWTSecret, nil
	})
}

// * CustomClaims: JWTのカスタムクレームを取得します。
func CustomClaims(token *jwt.Token) (jwt.MapClaims, error) {
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return nil, jwt.ErrSignatureInvalid
	}
	return claims, nil
}

// * RefreshJWT: JWTを更新します。
func RefreshJWT(token *jwt.Token, cfg *config.Config) (string, error) {
    claims, err := CustomClaims(token)
    if err != nil {
        return "", err
    }
    
    newClaims := jwt.MapClaims{
        "sub":  claims["sub"],
        "name": claims["name"],
        "exp":  time.Now().Add(time.Hour * 1).Unix(),
        "iat":  time.Now().Unix(),
    }
    
    newToken := jwt.NewWithClaims(jwt.SigningMethodHS256, newClaims)
    return newToken.SignedString(cfg.Auth.JWTSecret)
}

// * JWTMiddleware: 認証が必要なルートを保護します。
func JWTMiddleware(cfg *config.Config, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "認証ヘッダが必要です", http.StatusUnauthorized)
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			http.Error(w, "無効な認証形式です", http.StatusUnauthorized)
			return
		}

		token, err := VerifyJWT(parts[1], cfg)
		if err != nil {
			http.Error(w, "トークンが無効、または有効期限が切れています", http.StatusUnauthorized)
			return
		}

		claims, err := CustomClaims(token)
		if err != nil {
			http.Error(w, "クレームの取得に失敗しました", http.StatusUnauthorized)
			return
		}

		sub, ok := claims["sub"].(float64)
		if !ok {
			http.Error(w, "ユーザー識別子の取得に失敗しました", http.StatusUnauthorized)
			return
		}
		UserID := int(sub)
		
		ctx := context.WithValue(r.Context(), UserIDKey, UserID)
		next.ServeHTTP(w, r.WithContext(ctx))
	}
}

// * RevokeJWT: 特定のトークンをブラックリストに登録します。
func RevokeJWT(tokenString string, expiration time.Duration) error {
	if tokenString == "" {
		return nil
	}

	if expiration <= 0 {
		expiration = time.Hour
	}

	revokedMu.Lock()
	revokedTokens[tokenString] = time.Now().Add(expiration)
	revokedMu.Unlock()

	cleanerOnce.Do(func() {
		go func() {
			ticker := time.NewTicker(time.Minute)
			defer ticker.Stop()
			for range ticker.C {
				now := time.Now()
				revokedMu.Lock()
				for k, exp := range revokedTokens {
					if exp.Before(now) {
						delete(revokedTokens, k)
					}
				}
				revokedMu.Unlock()
			}
		}()
	})

	return nil
}

// * IsTokenRevoked: 特定のトークンがブラックリストに登録されているかどうかを確認します。
func IsTokenRevoked(tokenString string) bool {
	if tokenString == "" {
		return false
	}

	revokedMu.RLock()
	exp, ok := revokedTokens[tokenString]
	revokedMu.RUnlock()
	
	if !ok {
		return false
	}

	return time.Now().Before(exp)
}
