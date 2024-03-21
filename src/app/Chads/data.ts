import { Keypair } from "@solana/web3.js";

export type Chad = {
  id: number;
  name: string;
  employeeCode: string;
  contactNumber: string;
  designation: string;
  address: string;
  pubkey: string; // Add the "pubkey" field
  salary: number;
  team: string; // Add the "team" field
};

export const PersonHeaders = [
  "name",
  "employeeCode",
  "pubkey", // Add the "pubkey" header
  "designation",
  "team",
  "salary",
  "contactNumber",
  "address",
  // Add the "Team" header
];

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

export const generatePeopleData = (): Chad[] => {
  const teams = ["Team A", "Team B", "Team C", "Team D"]; // Define possible team names
  const peopleData: Chad[] = [];

  for (let i = 1; i <= 20; i++) {
    const keypair = Keypair.generate();
    const person: Chad = {
      id: i,
      name: `Person_${i}`,
      employeeCode: `EMP${generateRandomNumber(1000, 9999)}`,
      contactNumber: generateRandomContactNumber(),
      designation: `Designation ${i}`,
      address: `Address ${i}`,
      pubkey:
        i == 1
          ? "8rrBaEqmiWbb9JzLHePuA9zX4ToHWoxC4U2KTbebFt4f"
          : keypair.publicKey.toString(), // Assign a random public key
      salary: generateRandomNumber(50000, 120000),
      team: teams[generateRandomNumber(0, teams.length - 1)], // Assign a random team
    };

    peopleData.push(person);
  }

  return peopleData;
};
