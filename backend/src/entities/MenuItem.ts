import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("menu_items")
export class MenuItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  currentPrice!: number;

  @Column({ default: true })
  currentAvailability!: boolean;

  @Column({ type: "text", nullable: true })
  description!: string;

  @CreateDateColumn({ type: "datetime2" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "datetime2" })
  updatedAt!: Date;
}
