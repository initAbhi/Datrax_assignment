import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("menu_items")
export class MenuItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  currentPrice!: number;

  @Column({ default: true })
  currentAvailability!: boolean;

  @Column({ type: "text", nullable: true })
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
