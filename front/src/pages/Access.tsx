function Access() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">アクセス</h1>
        <p className="text-xl text-gray-600">
          ソフトウェア工房への連絡・アクセス方法
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">連絡先</h3>
          <div className="space-y-3 text-gray-600">
            <p>アクセス情報をここに記載します。</p>
            <p>住所、最寄り駅、連絡先などの情報を含めることができます。</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">場所</h3>
          <div className="space-y-3 text-gray-600">
            <p>研究室の場所や最寄り駅からのアクセス方法をここに記載します。</p>
            <p>建物名、階数、部屋番号などの詳細情報。</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Access;