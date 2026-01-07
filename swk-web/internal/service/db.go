// app/service/db.go
package service

import (
	"log"
	"swk-web/internal/config"
	"swk-web/internal/model"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// データベースに接続するための関数
func InitDB() {
	cfg := config.LoadConfig()

	var err error
	DB, err = gorm.Open(postgres.Open(cfg.DB.DSN), &gorm.Config{})
	if err != nil {
		log.Fatal("Connection Failed:", err)
	}
	log.Println("Connection Successfully")
}

// データベースを更新する関数
func MigrateDB() {
	err := DB.AutoMigrate(&model.User{})
	if err != nil {
		log.Fatal("Migration Failed:", err)
	}
	log.Println("Migration Successfully")
}

// データベースを閉じる関数
func CloseDB() {
	postgresDB, err := DB.DB()
	if err != nil {
		log.Fatal("Get DB Failed:", err)
	}
	err = postgresDB.Close()
	if err != nil {
		log.Fatal("Close Failed:",err)
	}
	log.Println("Close Successfully")
}

// トランケーションを開始する関数
func WithTransaction(fn func(tx *gorm.DB) error) error {
	return DB.Transaction(func(tx *gorm.DB) error {
		return fn(tx)
	})
}