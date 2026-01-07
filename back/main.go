package main

import (
	"back/routes"
)

func main() {
	r := routes.SetupRouter()
	
	r.Run(":8080")
}