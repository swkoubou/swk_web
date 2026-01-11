package controller

import (
	"net/http"
	"strconv"
	models "swk-web/internal/model"
	"time"

	"github.com/gin-gonic/gin"
)

// 記事を一時的に保管する変数です。
var articles = []models.Article{
	{ID: 1, Title: "ソフトウェア工房", Content: "ここは神奈川工科大学の・・・です。", Author: "工房一同", CreatedAt: time.Now(), UpdatedAt: time.Now()},
}

// GET `/articles`
// すべての記事を取得します。
func GetArticles(c *gin.Context) {
	c.JSON(http.StatusOK, articles)
}

// GET `/articles/:id`
// IDに該当する記事を取得します。
func GetArticle(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid ID format."})
		return
	}

	for _, art := range articles {
		if art.ID == id {
			c.JSON(http.StatusOK, art)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"message": "Article not found."})
}

// POST `/articles`
// 新しい記事を作成します。
func CreateArticle(c *gin.Context) {
	var newArticle models.Article
	if err := c.ShouldBindJSON(&newArticle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newArticle.ID = len(articles) + 1
	newArticle.CreatedAt = time.Now()
	newArticle.UpdatedAt = time.Now()

	articles = append(articles, newArticle)
	c.JSON(http.StatusCreated, newArticle)
}

// PUT `/articles/id:`
// IDに該当する記事を更新します。
func UpdateArticle(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format."})
		return
	}

	var input models.Article
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	for i, art := range articles {
		if art.ID == id {
			articles[i].Title = input.Title
			articles[i].Content = input.Content
			articles[i].Author = input.Author
			articles[i].UpdatedAt = time.Now()

			c.JSON(http.StatusOK, articles[i])
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"message": "Article not found."})
}

// DELETE `/articles/id:`
// IDに該当する記事を削除します。
func DeleteArticle(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format."})
		return
	}

	for i, art := range articles {
		if art.ID == id {
			articles = append(articles[:i], articles[i+1:]...)

			c.JSON(http.StatusOK, gin.H{"message": "Article deleted."})
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"message": "Article not found."})
}
