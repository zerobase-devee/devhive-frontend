export const AUTH_FORM_REGEX = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/,
  nickname: /^[a-zA-Z0-9가-힣!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,6}$/,
  specialCharacterRegex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
}
