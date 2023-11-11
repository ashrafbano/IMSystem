export interface HolidayRequest {
  id: string;
  name: string;
  userPhone: string;
  phone: string;
  noOfDays: number;
  reason: string;
  status: "CREATED" | "APPROVED" | "REJECTED";
  adminApproved?: boolean;
  approved?: boolean;
  createdDate: Date;
}
