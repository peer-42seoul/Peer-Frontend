const validation = (target: string) => {
  // 한글, 영문, 숫자만 입력 가능
  // 2~12자리
  let check = /^[\d|a-zA-Z|가-힣]{2,12}$/

  if (check.test(target)) {
    return false
  }

  return true
}

const validationNumber = (target: string) => {
  // 숫자만 입력 가능
  // 1~2자리
  let check = /^[0-9]{1,2}$/

  if (check.test(target)) {
    return false
  }

  return true
}

export { validation, validationNumber }
