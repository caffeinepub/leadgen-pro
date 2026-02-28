import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Lead {
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface Init {
    admin: Principal;
    bookingUrl: string;
}
export interface SiteConfig {
    bookingUrl: string;
}
export interface backendInterface {
    getLeads(): Promise<Array<Lead>>;
    getLeadsSortedByEmail(): Promise<Array<Lead>>;
    getSiteConfig(): Promise<SiteConfig>;
    init(init: Init): Promise<void>;
    submitLead(name: string, email: string, message: string): Promise<void>;
    updateBookingUrl(url: string): Promise<void>;
}
