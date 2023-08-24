const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/, // .css 확장자로 끝나는 모든 파일
        use: ["style-loader", "css-loader"], // css-loader를 앞에 추가한다.
      },
      {
        test: /\.png$/, // .png로 끝나는 모든 파일
        loader: "file-loader",
        options: {
          publicPath: "./dist/", // prefix를 아웃풋 경로로 지정
          name: "[name].[ext]?[hash]", // 파일명 형식
        },
      },
      {
        test: /\.png$/, // .png로 끝나는 모든 파일
        use: {
          loader: "url-loader",
          options: {
            publicPath: "./dist/", // prefix를 아웃풋 경로로 지정
            name: "[name].[ext]?[hash]", // 파일명 형식
            limit: 5000, // 5kb 미만 파일만 data url로 처리
          },
        },
      },
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
    ],
  },
  mode: "development",
  entry: {
    main: "./src/app.js", // 시작 entry 파일 위치를 입력
  },
  output: {
    filename: "[name].js", //[name] 을 쓰는 이유는 entry 에서 설정한 이름으로 파일이 생성되기 때문
    path: path.resolve("./dist"),
  },
};
