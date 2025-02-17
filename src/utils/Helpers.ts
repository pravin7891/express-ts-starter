import crypto from "crypto";

// parseQueryParams
export interface QueryParams {
  s?: string;
  sortField: string;
  sortOrder: "ASC" | "DESC";
  page: number;
  limit: number;
}

export const parseQueryParams = (query: any): QueryParams => {
  return {
      s: query?.s?.toString() || undefined,
      sortField: query?.sort?.toString() || "createdAt",
      sortOrder: query?.order?.toString().toUpperCase() === "DESC" ? "DESC" : "ASC",
      page: Math.max(parseInt(query?.page as string, 10) || 1, 1),
      limit: Math.max(parseInt(query?.limit as string, 10) || 10, 1),
  };
};

export const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};