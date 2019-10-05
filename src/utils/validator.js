export const pattern = {
  //匹配带字母、数字、中文、下划线、短横线，至少4位字符，至多16位字符的名字
  name: '^[a-zA-Z0-9\\u4E00-\\u9FA5_\\-]{4,16}$',
  //匹配至少6位字符的密码，允许指定特殊字符
  pwd: '^[a-zA-Z0-9_\\-\\!\\@\\#\\$\\%\\^\\&\\*\\?]{6,}$',
  //匹配邮箱或支付宝
  email: '^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$',
  //匹配手机号或支付宝
  phone: '^1[3-9]\\d{9}$',
  //匹配微信号
  wechat: '^[a-zA-Z]([\\-_a-zA-Z0-9]{5,19})+$',
  //匹配中文名
  zhname: '^[\\u4E00-\\u9FA5]{2,5}$'
}

export const validate = (type, value, callback) => {
  const result = new RegExp(pattern[type]).test(value);
  callback && callback(result);
  return result;
}