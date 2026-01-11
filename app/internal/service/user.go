// app/internal/repository/admin_repository.go
package service

import (
	"errors"
	"swk-web/internal/config"
	"swk-web/internal/model"
	"swk-web/internal/repository"

	"gorm.io/gorm"
)

type UserService struct {
	UserRepo *repository.GormUserRepository
}

// if admin user does not exist, create it or if admin user exists, update it
func (s *UserService) SetupAdminUser(cfg *config.Config) error {
	exists, err := s.UserRepo.GetUserByUsername(cfg.Auth.AdminUsername)
	
	return WithTransaction(func(DB *gorm.DB) error {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			newAdmin := model.User{
				Username: cfg.Auth.AdminUsername,
				Password: cfg.Auth.AdminPassword,
				Permission: model.UserPermission{
					Admin: true,
					Read:  true,
					Write: true,
				},
			}
			
			return s.UserRepo.CreateUser(&newAdmin)
		} else if err != nil {
			return err
		}

		exists.Username = cfg.Auth.AdminUsername
		exists.Password = cfg.Auth.AdminPassword
		return s.UserRepo.UpdateUser(exists)
	})
}