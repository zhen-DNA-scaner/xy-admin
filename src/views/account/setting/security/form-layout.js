export const formItemLayout = formLayout => {
  return formLayout && formLayout === 'horizontal' ? {} : {
    labelCol: { span: 9 },
    wrapperCol: { span: 7 },
  };
};

export const buttonItemLayout = formLayout => {
  return formLayout && formLayout === 'horizontal' ? {} : {
    wrapperCol: { span: 14, offset: 9 },
  };
}