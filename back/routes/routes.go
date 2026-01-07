package routes

import (
	"github.com/gin-gonic/gin"	// gin
	"back/handlers"					// handler
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	v1 := r.Group("/api/v1")
	{
		articles := v1.Group("/articles")
		{
			articles.GET("", handlers.GetArticles)
			articles.GET("/:id", handlers.GetArticlesByID)
			articles.POST("", handlers.CreateArticle)
			articles.PUT("/:id", handlers.UpdateArticle)
			articles.DELETE("/:id", handlers.DeleteArticle)
		}
	}

	return r
}