package model

// User Struct
type User struct {
	ID         uint   		  `gorm:"primaryKey;autoIncrement" json:"id"`
	Username   string 		  `gorm:"unique;not null" json:"username"`
	Password   []byte 		  `gorm:"not null" json:"-"`
	Permission UserPermission
}

// UserPermission Struct
type UserPermission struct {
	Admin 	bool `gorm:"default:false;not null" json:"admin"`
	Read 	bool `gorm:"default:true" json:"read"`
	Write 	bool `gorm:"defualt:false" json:"write"`
}