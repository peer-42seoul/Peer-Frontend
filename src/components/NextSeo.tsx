const NextSeo = ({
  webMetadata,
}: {
  webMetadata: {
    title: string
    description: string
    url: string
    image: string
  }
}) => {
  return (
    <>
      {/* Html meta tag */}
      <title>{webMetadata?.title}</title>
      <meta name="description" content={webMetadata?.description} />
      {/* Facebook meta tag */}
      <meta property="og:title" content={webMetadata?.title} />
      <meta property="og:description" content={webMetadata?.description} />
      <meta property="og:image" content={webMetadata?.image} />
      <meta property="og:url" content={webMetadata?.url} />
      <meta property="og:type" content="website" />
      {/* Twitter meta tag */}
      <meta name="twitter:title" content={webMetadata?.title} />
      <meta name="twitter:description" content={webMetadata?.description} />
      <meta name="twitter:image" content={webMetadata?.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={webMetadata.url} />
    </>
  )
}

export default NextSeo
