FROM golang:1.25-alpine
WORKDIR /app
# HRM tool 「air」 のインストール
RUN go install github.com/air-verse/air@latest
# go.sum はないので go.mod だけコピー
COPY go.mod ./
# 依存関係のダウンロード
RUN go mod download
COPY . .
CMD ["air"]