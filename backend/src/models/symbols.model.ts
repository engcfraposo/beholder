import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, BaseEntity } from "typeorm"

@Entity()
export class Symbols extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  id!: number

  @Column({
    nullable: false,
  })
  @Index({ unique: true })
  symbol!: string

  @Column({
    type: "int",
    nullable: false,
  })
  basePrecision!: number

  @Column({
    type: "int",
    nullable: false,
  })
  quotePrecision!: number

  @Column({
    nullable: false,
  })
  minNotional!: string

  @Column({
    nullable: false,
  })
  minLotSize!: string

  @Column({
    nullable: false,
    default: false,
  })
  isFavorite!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}