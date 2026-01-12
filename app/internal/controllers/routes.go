package controllers

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	// r.Use(gin.Logger()) 		// ログ出力を有効にする場合はコメントアウトを外す
	// r.Use(cors.Default()) 	// すべてのオリジンを許可する場合はコメントアウトを外す

	// CORS設定: 開発中のフロントからのアクセスを許可
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type", "Accept"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	api := r.Group("/api")
	{
		// 認証ルート（保護なし）
		auth := api.Group("/auth")
		{
			auth.POST("/login", service.Login)
			auth.GET("/check", service.CheckAuth)
		}

		// "api/articles" 以下のルートをハンドラーに紐付けます。
		articles := api.Group("/articles")
		{
			articles.GET("", controller.GetArticles)
			articles.GET("/:id", controller.GetArticle)
		}

		// "api/admin/articles" 以下のルートをハンドラーに紐付けます（認証必須）
		adminArticles := api.Group("/admin/articles")
		adminArticles.Use(controller.MiddlewareAuthRequired())
		{
			adminArticles.POST("", controller.CreateArticle)
			adminArticles.PUT("/:id", controller.UpdateArticle)
			adminArticles.DELETE("/:id", controller.DeleteArticle)
		}

	}

	return r
}
