package repository

// app/internal/repository/user_repository.go

import (
	"swk-web/internal/model"

	"gorm.io/gorm"
)

type GormUserRepository struct {
	DB *gorm.DB
}

// Get user by username
func (r *GormUserRepository) GetUserByUsername(username string) (*model.User, error) {
	var user model.User
	err := r.DB.Where("username = ?", username).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

// Get user by ID
func (r *GormUserRepository) GetUserByID(id uint ) (*model.User, error) {
	var user model.User
	result := r.DB.First(&user, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}

// Get all users
func (r *GormUserRepository) GetUsers() ([]model.User, error) {
	var users []model.User
	result := r.DB.Find(&users)
	if result.Error != nil {
		return nil, result.Error
	}
	return users, nil
}

// Create new user
func (r *GormUserRepository) CreateUser(user *model.User) error {
	result := r.DB.Create(user)
	return result.Error
}

// Update a user
func (r *GormUserRepository) UpdateUser(user *model.User) error {
	result := r.DB.Save(user)
	return result.Error
}

// Delete a user
func (r *GormUserRepository) DeleteUser(user *model.User) error {
	result := r.DB.Delete(user)
	return result.Error
}
