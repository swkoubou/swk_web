package service

// app/internal/service/password.go
// * This is for password handler logic

import "golang.org/x/crypto/bcrypt"

// Generate a hashed pwd from a plain pwd
func CreateHashedPassword(pwd []byte) (string, error) {
	hashedPwd, err := bcrypt.GenerateFromPassword(pwd, bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPwd), nil
}

// Compare hashed pwd with a plain pwd
func ComparePassword(hashedPwd string, plainPwd []byte) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPwd), plainPwd)
}