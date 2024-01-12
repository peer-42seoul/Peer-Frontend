const UTCtoLocalTime = (utcTime: string) => {
  const utcDate = new Date(utcTime)
  return new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60 * 1000)
}

export default UTCtoLocalTime
