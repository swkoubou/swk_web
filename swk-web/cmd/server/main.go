package main

import (
	"back/internal/controller/routes"
)


func main() {
	r = routes.SetupRouter()

	r.Run() // - Default :8080 ポートで起動
}