export const formItemLayout = formLayout => {
  return formLayout && formLayout === 'horizontal' ? {} : {
    labelCol: { span: 7 },
    wrapperCol: { span: 10 },
  };
};

export const buttonItemLayout = formLayout => {
  return formLayout && formLayout === 'horizontal' ? {} : {
    wrapperCol: { span: 14, offset: 7 },
  };
}