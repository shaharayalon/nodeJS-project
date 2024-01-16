const validation = (schema, userInput) => {
  const { error } = schema.validate(userInput, {
    abortEarly: false,
  });
  if (!error) {
    return null;
  }

  const { details } = error;
  let errorObj = {};
  for (let detail of details) {
    let key = detail.path[0];
    let { message } = detail;
    errorObj[key] = message;
  }
  return errorObj;
};

export default validation;
