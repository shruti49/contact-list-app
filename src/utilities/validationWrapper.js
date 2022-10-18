import { validate } from "validate.js";
import constraints from "./validation";

const validateWrapper = (fieldName, value) => {
	const formValues = {};
	formValues[fieldName] = value;

	const formFields = {};
	const constraint = constraints[fieldName];
	formFields[fieldName] = constraint;
	const result = validate(formValues, formFields);
	if (result) {
		return result[fieldName][0];
	}

	return null;
};

export default validateWrapper;
