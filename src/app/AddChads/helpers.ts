import { Chad } from "../Chads/data";

export const personHeaderColors = [
  // Add the "key" field
  "lightblue",
  "whitesmoke",
  "lightgreen",
  "yellow",
  "white",
  "lightpink",
  "aquamarine",
  "coral",
];

export const validateAddChadData = (data: Chad) => {
  const errors: string[] = [];

  if (!data.name || data.name.trim() === "") {
    errors.push("Name is required");
  }
  if (!data.employeeCode || data.employeeCode.trim() === "") {
    errors.push("Employee Code is required");
  }
  if (!data.contactNumber || data.contactNumber.trim() === "") {
    errors.push("Contact Number is required");
  }
  if (!data.designation || data.designation.trim() === "") {
    errors.push("Designation is required");
  }
  if (!data.address || data.address.trim() === "") {
    errors.push("Address is required");
  }
  if (!data.salary) {
    errors.push("Salary is required");
  }
  if (!data.team || data.team.trim() === "") {
    errors.push("Team is required");
  }

  if (errors.length == 0) {
    if (data.contactNumber) {
      if (data.contactNumber.length !== 12) {
        errors.push("Contact Number is invalid");
      }
    }
    if (data.salary) {
      if (data.salary < 0) {
        errors.push("Salary must be greater than 0");
      }
    }

    // if (data.employeeCode) {
    //   const regex = /^[A-Z]{3}\d{4}$/;
    //   if (!regex.test(data.employeeCode)) {
    //     errors.push("Employee Code is invalid");
    //   }
    // }
  }

  return errors;
};
