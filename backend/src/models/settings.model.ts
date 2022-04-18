import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from "typeorm"

@Entity()
export class Settings {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  id!: number

  @Column({
    nullable: false,
  })
  @Index({ unique: true })
  email!: string

  @Column({
    nullable: false,
  })
  password!: string

  @Column()
  apiUrl!: string

  @Column()
  accessKey!: string

  @Column()
  secretKey!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}