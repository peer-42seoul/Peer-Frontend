/** @type {import('next').NextConfig} */
const nextConfig = {}

// module.exports = nextConfig

module.exports = {
  ...nextConfig,
  images: {
    domains: ['picsum.photos', 'source.unsplash.com'],
  },
}

// Next.js에서는 'next.config.js' 파일의 'images' 속성을 구성하여 이미지에 허용되는 도메인을 지정해야 합니다. 이는 승인되지 않거나 잠재적으로 안전하지 않은 외부 이미지 소스가 기본적으로 로드되는 것을 방지하는 보안 기능입니다.

// '이미지' 구성을 사용하면 CORS(교차 원본 리소스 공유)와 관련된 보안 오류를 유발하지 않고 이미지를 로드할 수 있는 도메인을 지정할 수 있습니다. 기본적으로 Next.js는 보안상의 이유로 외부 도메인에서 이미지 로드를 제한합니다.

// 특별한 경우에는 picsum.photos의 이미지를 사용하고 싶으므로 domains 배열에 picsum.photos'를 포함시킵니다. 이를 구성하면 Next.js는 picsum.photos의 이미지를 문제 없이 로드할 수 있습니다.

// 이 구성은 잠재적인 보안 취약성으로부터 애플리케이션을 보호하는 데 도움이 되고 Next.js 애플리케이션에서 이미지를 제공하는 데 사용할 수 있는 도메인을 제어할 수 있도록 하기 때문에 필요합니다. 보안 문제와 예상치 못한 동작을 방지하기 위해 리소스를 로드할 것으로 예상되는 도메인을 지정하는 것이 웹 개발의 모범 사례입니다.

// 따라서 요약하자면 next.config.js에서 images 속성을 구성하는 것은 Next.js 애플리케이션에서 어떤 이미지 도메인을 신뢰할 수 있고 허용하는지 명시적으로 지정하는 방법입니다.
