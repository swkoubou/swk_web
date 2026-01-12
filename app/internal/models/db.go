package models

// UserRepository　Interface
type UserRepository interface {
	GetUserByUsername(username string) (*User, error)
	GetUserByID(id uint ) (*User, error)
	GetUsers() ([]User, error)
	CreateUser(user *User) error
	UpdateUser(user *User) error
	DeleteUser(user *User) error
}