export interface ITransaction {
  ID: string;
  System: string;
  Amount: string;
  Status: number | string;
  Note: string;
  Date: string;
  DateISO: string | Date;
  AllowCancelation?: string;
}
