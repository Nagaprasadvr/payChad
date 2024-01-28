export type Person = {
  name: string;
  employeeCode: string;
  contactNumber: string;
  designation: string;
  address: string;
  salary: number;
  team: string; // Add the "team" field
};

const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomContactNumber = (): string => {
  const countryCode = "+1"; // Assuming a US country code for simplicity
  const phoneNumber = generateRandomNumber(1000000000, 9999999999).toString();
  return `${countryCode}-${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6)}`;
};

export const generatePeopleData = (): Person[] => {
  const teams = ["Team A", "Team B", "Team C", "Team D"]; // Define possible team names
  const peopleData: Person[] = [];

  for (let i = 1; i <= 20; i++) {
    const person: Person = {
      name: `Person ${i}`,
      employeeCode: `EMP${generateRandomNumber(1000, 9999)}`,
      contactNumber: generateRandomContactNumber(),
      designation: `Designation ${i}`,
      address: `Address ${i}`,
      salary: generateRandomNumber(50000, 120000),
      team: teams[generateRandomNumber(0, teams.length - 1)], // Assign a random team
    };

    peopleData.push(person);
  }

  return peopleData;
};
