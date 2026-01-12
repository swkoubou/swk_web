package models

import "time"

// Article Struct
type Article struct {
	ID        int       `grom:"primaryKey;autoIncrement" json:"id"`
	Title     string    `gorm:"unique;not null" json:"title"`
	Content   string    `gorm:"unique;not null" json:"content"`
	AnchorID  int       `gorm:"unique;not null" json:"anchor_id"`
	Author    string    `gorm:"unique;not null" json:"author"`
	CreatedAt time.Time `gorm:"not null" json:"create_at"`
	UpdatedAt time.Time `gorm:"not null" json:"update_at"`
}

// Author Struct
type Author struct {
	ID        int       `gorm:"primaryKey;autoIncrement" json:"id"`
	Name      string    `gorm:"unique;not null" json:"name"`
}

// ArticleResponse Struct
type ArticleResponse struct {
	ID        int       `gorm:"primaryKey;autoIncrement" json:"id"`
	Title     string    `gorm:"unique;not null" json:"title"`
	Content   string    `gorm:"unique;not null" json:"content"`
	AnchorID  int       `gorm:"unique;not null" json:"anchor_id"`
	Author    string    `gorm:"unique;not null" json:"author"`
	CreatedAt time.Time `gorm:"not null" json:"create_at"`
	UpdatedAt time.Time `gorm:"not null" json:"update_at"`
}