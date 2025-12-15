function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          ソフトウェア工房
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          かっこいい構文を書く、創造的なソフトウェア開発集団
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            かっこいい構文を書く
          </h2>
          <p className="text-gray-600 leading-relaxed">
            私たちは最新の技術を駆使し、美しく効率的なコードを書くことに情熱を注いでいます。
            React、TypeScript、そして現代的な開発手法を用いて、革新的なソフトウェアを生み出しています。
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-64 h-64 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-center shadow-lg">
            <p className="text-lg font-medium">
              工房のアイコンを<br />
              乗っける
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">ソフトウェア工房とは</h3>
          <p className="text-gray-600 leading-relaxed">
            ソフトウェア工房は、学生によるソフトウェア開発組織です。
            最新の技術を学び、実践的なプロジェクトを通して成長することを目指しています。
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">総合プロジェクトリーダー挨拶</h3>
          <p className="text-gray-600 leading-relaxed">
            こんどうそうたが文章を考える
          </p>
        </div>
      </div>

      {/* News Section */}
      <div className="bg-primary-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">最新のお知らせ</h3>
        <div className="space-y-4">
          <div className="bg-white rounded-md p-4 border-l-4 border-primary-500">
            <p className="text-gray-600 text-sm">2024.12.15</p>
            <p className="font-medium text-gray-900">新しい順に3つ</p>
          </div>
          <div className="bg-white rounded-md p-4 border-l-4 border-primary-500">
            <p className="text-gray-600 text-sm">2024.12.10</p>
            <p className="font-medium text-gray-900">お知らせ項目 2</p>
          </div>
          <div className="bg-white rounded-md p-4 border-l-4 border-primary-500">
            <p className="text-gray-600 text-sm">2024.12.05</p>
            <p className="font-medium text-gray-900">お知らせ項目 3</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;