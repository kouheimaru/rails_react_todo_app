# todoアプリ（ポートフォリオ）
公開URL  
https://loving-bardeen-d94968.netlify.app/

## アプリの概要
漫画「灼熱カバディ」のキャラの人気投票・コメントができるアプリです。  

## 使用技術一覧・選定理由
react ライブラリ  
モダンな技術であり、勉強するため採用。
Vuetify UIフレームワーク  
日本語情報も豊富かつ、デザインがしやすいため採用。  
mysql データベース  
railsコントローラーとの相性がよいため。  
また、デプロイの際のrailsと組み合わせたものの情報の多さから採用。   
heorku デプロイ  
RDBを扱ったrailsのデプロイにおいて、AWSと比較して 
用意にデプロイできるので採用。

## 目的
railsとreactの練習  
また自分の作りたいアプリの機能の一部として導入したいと思っていたため。


## 機能一覧
* todoリストの削除/作成更新/読み込み  
コントローラーで作成
* 検索機能  
rubyメソッドで実装  
* 入力内容の空白時のバリデーション

## こだわった点・苦労した点
* heorkuのデプロイは初めてだったため、  
CSSが適用されない等の自体に会い、解決して正常にデプロイまでに時間がかかった。
