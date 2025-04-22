

export const handleError = (error, res) => {
  console.log("Something went wrong: " + error);
  res.status(400).json({ message: error.message });
};

export const validateReqFields = (req, allowedFields) => {
  //Is Request body is present or not
  if (!req.body) {
    throw new Error("Request body is missing.");
  }
  const body = req.body;
  const reqBodyKeys = Object.keys(body);

  if (reqBodyKeys.length === 0) {
    throw new Error(
      `Required fields are missing: ${allowedFields.join(", ")} `
    );
  }

  // fields validation
  const invalidFields = reqBodyKeys.filter(
    (field) => !allowedFields.includes(field)
  );
  if (invalidFields.length !== 0) {
    throw new Error(`Invlaid fields: ${invalidFields.join(", ")}`);
  }

  const missingFields = allowedFields.filter(
    (field) => !reqBodyKeys.includes(field)
  );
  if (missingFields.length !== 0) {
    throw new Error(`Missing fields: ${missingFields.join(", ")}`);
  }

  return {reqBodyKeys}
};
