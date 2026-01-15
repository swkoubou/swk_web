package models

import (
	"fmt"
	"strings"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// ユーザーのデータ構造
type User struct {
	ID             string         `gorm:"primaryKey;type:uuid" json:"id"`
	Username       string         `gorm:"uniqueIndex;not null" json:"username"`
	HashedPassword []byte         `gorm:"not null" json:"-"`
	Permissions    UserPermission `gorm:"embedded" json:"permissions"`
	CreatedAt      time.Time      `gorm:"not null" json:"create_at"`
	UpdatedAt      time.Time      `gorm:"not null" json:"update_at"`
}

// ユーザー権限のデータ構造
type UserPermission struct {
	Admin bool `gorm:"default:false;not null" json:"admin"`
	Read  bool `gorm:"default:false;not null" json:"read"`
	Write bool `gorm:"default:false;not null" json:"write"`
}

// ユーザ名、パスワードがユーザ情報に含まれているかを確認します。
func (u *User) Validation(errMessages *[]string) {
	if u.Username == "" {
		*errMessages = append(*errMessages, "・ユーザ情報にユーザ名が含まれていません。")
	}
	if len(u.HashedPassword) == 0 {
		*errMessages = append(*errMessages, "・ユーザ情報にパスワードが含まれていません。")
	}
}

// ユーザ情報の登録前に、ユーザ情報に必須フィールドが含まれているかを確認します。
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	var errMessages []string

	if u.ID == "" {
		u.ID = uuid.New().String()
	}
	u.Validation(&errMessages)

	if len(errMessages) > 0 {
		return fmt.Errorf("以下を確認してください: ¥n%s", strings.Join(errMessages, "\n"))
	}

	return nil
}

// ユーザ情報の更新前に、ユーザ情報に必須フィールドが含まれているかを確認します。
func (u *User) BeforeUpdate(tx *gorm.DB) (err error) {
	var errMessages []string

	if u.ID == "" {
		errMessages = append(errMessages, "・ユーザ情報に識別子が含まれていません。")
	}
	u.Validation(&errMessages)

	if len(errMessages) > 0 {
		return fmt.Errorf("以下を確認してください: ¥n%s", strings.Join(errMessages, "\n"))
	}

	return nil
}

// ユーザー削除前に、ユーザ情報に削除対象の識別子が含まれているかを確認します。
func (u *User) BeforeDelete(tx *gorm.DB) (err error) {
	if u.ID == "" {
		return gorm.ErrRecordNotFound
	}

	return nil
}
