package models

// app/internal/service/errors.go

import "errors"

var (
	ErrWritePermission = errors.New("書き込み権限が不足しています。")
	ErrReadPermission = errors.New("読み取り権限が不足しています。")
	ErrInvalidToken = errors.New("無効なトークンです。")
)