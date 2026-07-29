import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from "typeorm";
import { User } from "./User";
import { MenuItem } from "./MenuItem";

export enum ChangeType {
  PRICE_UPDATE = "PRICE_UPDATE",
  AVAILABILITY_UPDATE = "AVAILABILITY_UPDATE",
  DESCRIPTION_UPDATE = "DESCRIPTION_UPDATE",
}

export enum RequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

@Entity("change_requests")
@Index(["createdById", "status"])
@Index(["status", "approvedAt"])
export class ChangeRequest {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  requestNumber!: string;

  @ManyToOne(() => MenuItem, { onDelete: "CASCADE" })
  @JoinColumn({ name: "itemId" })
  item!: MenuItem;

  @Column()
  itemId!: string;

  @Column({ type: "varchar", length: 50 })
  changeType!: ChangeType;

  @Column({ type: "text", nullable: true })
  oldValue!: string;

  @Column({ type: "text" })
  newValue!: string;

  @Column({ type: "text" })
  reason!: string;

  @Column({ type: "varchar", length: 50, default: RequestStatus.PENDING })
  status!: RequestStatus;

  @ManyToOne(() => User, { onDelete: "NO ACTION" })
  @JoinColumn({ name: "createdById" })
  createdBy!: User;

  @Column()
  createdById!: string;

  @ManyToOne(() => User, { nullable: true, onDelete: "NO ACTION" })
  @JoinColumn({ name: "approvedById" })
  approvedBy!: User | null;

  @Column({ nullable: true })
  approvedById!: string | null;

  @CreateDateColumn({ type: "datetime2" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "datetime2" })
  updatedAt!: Date;

  @Column({ type: "datetime2", nullable: true })
  approvedAt!: Date | null;
}
