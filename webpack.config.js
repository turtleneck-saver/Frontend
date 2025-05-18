const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    main: "./src/index.jsx", // 메인 엔트리 포인트
  },
  output: {
    path: path.resolve(__dirname, "./static/frontend"), // 출력 경로
    filename: "[name].js", // 출력 파일 이름
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js 및 .jsx 파일에 대한 규칙
        exclude: /node_modules/, // node_modules 폴더 제외
        use: {
          loader: "babel-loader", // Babel 로더 사용
        },
      },
      {
        test: /\.css$/, // .css 파일에 대한 규칙
        use: [
          "style-loader", // CSS를 DOM에 주입
          "css-loader", // CSS를 JS로 변환
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|png|jpg|gif|cur|wasm)$/, // 비디오 및 오디오 파일 처리 규칙
        use: [
          {
            loader: "file-loader", // 파일 로더 사용
            options: {
              name: "[path][name].[ext]", // 파일 이름 및 경로 유지
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true, // 코드 최소화
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"), // 환경 변수 설정
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"], // .js 및 .jsx 파일 확장자 처리
  },
  mode: "production", // 프로덕션 모드 설정
};
