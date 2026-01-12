// app/internal/service/auth.go
package services

import (
	"log"
)

// - パスワードの変更を行うサービス
//
// - レポジトリにパスワードの更新を依頼します。変更後のパスワードの再表示・確認は行いません。
func ChangePassword (oldPass string, newPass string) {
	err := repository.updatePassword(newPass);
	if err != nil {
		log.Fatal("Change Password Failed: ", err)
	}
	
	log.Println("Change Password Successfully")
}

