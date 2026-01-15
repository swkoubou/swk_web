package repositories

import (
	"app/internal/models"

	"gorm.io/gorm"
)

type GormUserRepository struct {
	DB *gorm.DB
}

// ログイン済みのユーザー情報を「ユーザ名」で取得します
func (r *GormUserRepository) GetUserByUsername(username string) (*models.User, error) {
	var user models.User	
	err := r.DB.Where("username = ?", username).First(&user).Error

	if err != nil {
		return nil, err
	}

	return &user, nil
}

// ログイン済みのユーザー情報を「識別子」で取得します
func (r *GormUserRepository) GetUserByID(id uint ) (*models.User, error) {
	var user models.User
	tx := r.DB.First(&user, id)

	if tx.Error != nil {
		return nil, tx.Error
	}

	return &user, nil
}

// ログイン済みのすべてのユーザー情報を取得します
func (r *GormUserRepository) GetAllUsers() ([]models.User, error) {
	var users []models.User
	tx := r.DB.Find(&users)

	if tx.Error != nil {
		return nil, tx.Error
	}

	return users, nil
}

// 新しいユーザを作成します
func (r *GormUserRepository) CreateUser(user *models.User) (*models.User,error) {
	tx := r.DB.Create(user)
	createdUser := user

	return createdUser, tx.Error
}

// ログイン済みのユーザ情報を更新します
func (r *GormUserRepository) UpdateUser(user *models.User) (*models.User, error) {
	tx := r.DB.Model(models.User{ID: user.ID}).Updates(user)
	
	if tx.Error != nil { // SQLで問題があった場合
		return user, tx.Error
	}

	if tx.RowsAffected == 0 { // 更新対象が見つからない場合
		return user, gorm.ErrRecordNotFound
	}

	updatedUser := user
	
	return updatedUser, nil
}

// ユーザ情報を削除します
func (r *GormUserRepository) DeleteUser(user *models.User) (*models.User, error) {
	tx := r.DB.Delete(user)

	if tx.Error != nil {
		return user, tx.Error
	}

	if tx.RowsAffected == 0 { // 削除対象が見つからない場合
	
		return user, gorm.ErrRecordNotFound
	}

	deletedUser := user

	return deletedUser, nil
}
