package migrate

import (
	"swk-web/internal/service"
)



func Migrate() {
	service.InitDB() // - データベース接続の初期化
	service.SetupAdminUser() // - 管理者ユーザーのセットアップ
}
