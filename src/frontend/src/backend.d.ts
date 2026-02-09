import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ThumbnailConfig {
    height: bigint;
    borderSize: bigint;
    shapes: Array<Shape>;
    createdAt: bigint;
    text?: string;
    updatedAt?: bigint;
    width: bigint;
    borderColor: string;
    bgColor: string;
}
export interface Template {
    id: string;
    name: string;
    createdAt: bigint;
    updatedAt?: bigint;
    config: ThumbnailConfig;
}
export interface Shape {
    id: string;
    height: bigint;
    borderSize: bigint;
    rotation?: bigint;
    text?: string;
    width: bigint;
    borderColor: string;
    shapeType: Variant_rectangle_circle_triangle;
    bgColor: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_rectangle_circle_triangle {
    rectangle = "rectangle",
    circle = "circle",
    triangle = "triangle"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createTemplate(name: string, config: ThumbnailConfig): Promise<Template>;
    deleteTemplate(id: string): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getTemplate(id: string): Promise<Template>;
    getTemplates(): Promise<Array<Template>>;
    isCallerAdmin(): Promise<boolean>;
}
