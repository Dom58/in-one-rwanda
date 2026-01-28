import { ReactNode } from "react";

export type IHomeProps = {
  children: ReactNode;
};

type ICitizenDataProps = {
  
  documentNumber: string;
  surnames?: string;
  foreName?: string;
  dateOfBirth: string;
  placeOfBirth?: string;
  birthCountry?: string;
  province?: string;
  district?: string;
  sector?: string;
  cell?: string;
  placeOfIssue?: string;
  sex?: string;
  civilStatus?: string;
  maritalStatus?: string;
  spouse?: string;
  fatherNames?: string;
  motherNames?: string;
}

interface ICitizenDataResponse {
  identification: ICitizenDataProps;
};

export interface INewCitizenDataResponse {
  data: ICitizenDataResponse;
};

interface Coordinates {
  lat: string;
  long: string;
}

export interface MapComponentProps {
  coordinates: Coordinates;
}

export interface IRSSBData {
  isEmployee: boolean;
  rssbNumber: string;
}

export interface IPasswordChecker {
    isAccessValid: boolean;
    handleVerifyAccessCode: (e: React.FormEvent) => void;
    accessCode: string;
    setAccessCode: React.Dispatch<React.SetStateAction<string>>;
    errorMessage: string | null;
}
