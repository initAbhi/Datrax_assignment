import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum UserRole {
  MANAGER = "MANAGER",
  SUPERVISOR = "SUPERVISOR",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ type: "varchar", length: 50 })
  role!: UserRole;

  @CreateDateColumn({ type: "datetime2" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "datetime2" })
  updatedAt!: Date;
}
