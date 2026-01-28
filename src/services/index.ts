import { AppConfig } from "@/app/configs";
import { INewCitizenDataResponse, IRSSBData } from "@/app/types";
import Axios from "axios";

export const fetchUpiData = async (upi: string): Promise<any> => {
  const url = AppConfig.upi.concat(
    `?upi=${upi}`,
  );
  return (await Axios.get(url)).data;
};

export const findNationalIdData = async (nationalIdentification: string): Promise<INewCitizenDataResponse> => {
  const url = AppConfig.nida!;
  return (await Axios.post(url, { nationalIdentification })).data;
};

export const findIremboApplicationData = async (applicationNumber: string): Promise<any> => {
  const url = AppConfig.irembo.application!;
  const headers = {
    Accept: 'application/json, text/plain, */*',
    "Access-Control-Allow-Origin": '*',
    "Access-Control-Allow-Methods": "GET",
    'Applicationnumber': applicationNumber,
    'Nls': 'English',
    Referer: 'https://irembo.gov.rw/support/documents',
    'User-Agent': navigator.userAgent,
    'X-Requested-With': 'XMLHttpRequest',
  };
  const response = await Axios.get(url, { headers });
  return response.data;
};

export const findRssbData = async (phoneNumber: string): Promise<IRSSBData> => {
  const response = await Axios.get(`/api/check-phone?phoneNumber=${phoneNumber}`);
  return response.data;
};
