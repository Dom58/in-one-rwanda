declare global {
  interface Window {
    hikr: typeof Hikr; // Reference the Hikr class
  }
}

// Define the Hikr class structure
declare class Hikr {
  constructor(userConsent?: boolean);

  profileHistoryId: string | undefined;
  userConsent: boolean;
  
  static initialized: boolean;

  // Method declarations
  static createUser(websiteId: string, userConsent?: boolean): Promise<void>;
  static config(options: { websiteId: string; userConsent?: boolean }): Promise<void>;
  static pushData(data: { eventType?: string; collectionName?: string; data?: string; userConsent?: boolean }): void;

  static saveToLocalStorage(data: Record<string, string>): void;
  static createCookie(cookieName: string, cookieValue: string, userConsent: boolean): void;
  static readCookie(cookieName: string, userConsent: boolean): string | null;
  static onPageLoadOrURLChange(websiteId: string, userConsent: boolean): Promise<void>;
  static setupEventListeners(websiteId: string, userConsent: boolean): void;
  static handleButtonClick(button: HTMLButtonElement): Promise<void>;
  static handleFormSubmit(form: HTMLFormElement): Promise<void>;
  
  static setupInteractionListeners(eventType: string, collectionName: string, data: string, userConsent: boolean): void;
  static getCookieExpirationDate(): string;
  static getQueryParam(param: string): string | null;
  static apiCall(endpoint: string, payload?: Record<string, unknown>, method?: "GET" | "POST"): Promise<any>;
}

export {};
