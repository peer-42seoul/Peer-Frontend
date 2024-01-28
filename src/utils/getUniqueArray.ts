export const getUniqueArray = (
  duplicatedArray: Array<any>,
  keyForComparison: string,
) => {
  const uniqueArray = duplicatedArray.reduce(
    (acc: Array<any>, current: any) => {
      const x = acc.find(
        (item) => item[keyForComparison] === current[keyForComparison],
      )
      if (!x) {
        return acc.concat([current])
      } else {
        return acc
      }
    },
    [],
  )
  return uniqueArray
}
