import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm"

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    title: string

    @Column("text")
    description: string

    @Column({
        default: false,
        type: 'bit'
    })
    reminder: boolean

    @Column({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @BeforeInsert()
    private setCreateDate(): void {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    public setUpdateDate(): void {
        this.updatedAt = new Date();
    }

}