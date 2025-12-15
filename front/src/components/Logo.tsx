interface LogoProps {
  size?: number;
  className?: string;
}

function Logo({ size = 200, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#10b981", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#14b8a6", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>

      {/* 外側の六角形 */}
      <polygon
        points="100,20 160,55 160,125 100,160 40,125 40,55"
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth="2"
      />

      {/* 麻の葉模様 - 中心から放射状に伸びる線 */}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="20"
        stroke="url(#logoGradient)"
        strokeWidth="2"
      />
      <line
        x1="100"
        y1="100"
        x2="160"
        y2="55"
        stroke="url(#logoGradient)"
        strokeWidth="2"
      />
      <line
        x1="100"
        y1="100"
        x2="160"
        y2="125"
        stroke="url(#logoGradient)"
        strokeWidth="2"
      />
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="160"
        stroke="url(#logoGradient)"
        strokeWidth="2"
      />
      <line
        x1="100"
        y1="100"
        x2="40"
        y2="125"
        stroke="url(#logoGradient)"
        strokeWidth="2"
      />
      <line
        x1="100"
        y1="100"
        x2="40"
        y2="55"
        stroke="url(#logoGradient)"
        strokeWidth="2"
      />

      {/* 内側の六角形 */}
      <polygon
        points="100,50 130,67.5 130,102.5 100,120 70,102.5 70,67.5"
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth="2"
      />

      {/* 麻の葉模様の特徴的な菱形パターン */}
      {/* 上 */}
      <polygon
        points="100,20 115,42.5 100,50 85,42.5"
        fill="url(#logoGradient)"
        opacity="0.3"
      />

      {/* 右上 */}
      <polygon
        points="160,55 145,63.75 130,67.5 137.5,48.75"
        fill="url(#logoGradient)"
        opacity="0.3"
      />

      {/* 右下 */}
      <polygon
        points="160,125 145,116.25 130,102.5 137.5,121.25"
        fill="url(#logoGradient)"
        opacity="0.3"
      />

      {/* 下 */}
      <polygon
        points="100,160 115,137.5 100,120 85,137.5"
        fill="url(#logoGradient)"
        opacity="0.3"
      />

      {/* 左下 */}
      <polygon
        points="40,125 55,116.25 70,102.5 62.5,121.25"
        fill="url(#logoGradient)"
        opacity="0.3"
      />

      {/* 左上 */}
      <polygon
        points="40,55 55,63.75 70,67.5 62.5,48.75"
        fill="url(#logoGradient)"
        opacity="0.3"
      />

      {/* 中心の小さな六角形 */}
      <polygon
        points="100,80 115,87.5 115,102.5 100,110 85,102.5 85,87.5"
        fill="url(#logoGradient)"
        opacity="0.6"
      />
    </svg>
  );
}

export default Logo;
