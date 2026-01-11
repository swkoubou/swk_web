package config

// app/internal/config/config.go
// Config を操作・管理するためのメソッドが定義されている

import (
	"log"

	"github.com/caarlos0/env/v10"
	"github.com/joho/godotenv"
)

// * Config Model
type Config struct {
	Auth struct {
		JWTSecret 	  []byte `env:"JWT_SECRET, required"`
		AdminUsername string `env:"ADMIN_USERNAME, required"`
		AdminPassword []byte `env:"ADMIN_PASSWORD, required"`
	} `envPrefix:"AUTH_"`
	DB struct {
		DSN	string        `env:"DSN" envDefault:"postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable"`
		DBUser string     `env:"USER, required"`
		DBPassword []byte `env:"PASSWORD, required"`
		Host string 	  `env:"HOST" envDefault:"localhost"`
		Port int 	  `env:"PORT" envDefault:"5432"`
	} `envPrefix:"DB_"`
	API struct {
		Port int `env:"PORT" envDefault:"8080"`
	} `envPrefix:"API_"`
}

// * Load Config 環境変数を読み込む
func LoadConfig() *Config {
	_ = godotenv.Load()
	c := &Config{}

	if err := env.Parse(c); err != nil {
		log.Fatal("config error:", err)
	}

	return c
}

func (c *Config) GetDBDSN() string {
	return c.DB.DSN
}

func (c *Config) GetAPIPort() int {
	return c.API.Port
}

func (c *Config) GetDBUser() string {
	return c.DB.DBUser
}

func (c *Config) GetDBPassword() []byte {
	return c.DB.DBPassword
}

func (c *Config) GetDBHost() string {
	return c.DB.Host
}

func (c *Config) GetDBPort() int {
	return c.DB.Port
}

func (c *Config) GetJWTSecret() []byte {
	return c.Auth.JWTSecret
}

func (c *Config) GetAdminUsername() string {
	return c.Auth.AdminUsername
}

func (c *Config) GetAdminPassword() []byte {
	return c.Auth.AdminPassword
}
