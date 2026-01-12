package services

// internal/service/auth_utils.go
// * このファイルは権限の確認を行う関数を定義しています。

import "swk-web/internal/model"

// * 読み取り権限の確認
func IsRead(executor model.User) bool {
	return executor.Permission.Admin || executor.Permission.Read
}

// * 書き込み権限の確認
func IsWrite(executor model.User) bool {
	return executor.Permission.Admin || executor.Permission.Write
}
