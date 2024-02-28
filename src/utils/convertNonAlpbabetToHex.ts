// 주소값에 아스키코드인 특수문자가 들어가면 검색이 안되는 문제 해결을 위한 함수. 해당 특문은 모두 hexa 코드로 변환 및 앞에 %를 붙여야 합니다.
export const convertNonAlphabeticToHex = (inputString: string): string => {
  let result = ''
  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i]
    if ((char.charCodeAt(0) <= 127 && /[^\w\s]/.test(char)) || char === ' ') {
      const hexCode = char.charCodeAt(0).toString(16)
      result += '%' + hexCode.padStart(2, '0')
    } else {
      result += char
    }
  }
  return result
}
