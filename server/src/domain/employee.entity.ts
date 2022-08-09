/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Job } from './job.entity';
import { Department } from './department.entity';

/**
 * The Employee entity.
 */
@Entity('employee')
export class Employee extends BaseEntity {
    /**
     * The firstname attribute.
     */
    @Column({ name: 'first_name', nullable: true })
    firstName: string;

    @Column({ name: 'last_name', nullable: true })
    lastName: string;

    @Column({ name: 'email', nullable: true })
    email: string;

    @Column({ name: 'phone_number', nullable: true })
    phoneNumber: string;

    @Column({ type: 'datetime', name: 'hire_date', nullable: true })
    hireDate: any;

    @Column({ type: 'int', name: 'salary', nullable: true })
    salary: number;

    @Column({ type: 'int', name: 'commission_pct', nullable: true })
    commissionPct: number;

    @OneToMany((type) => Job, (other) => other.employee)
    jobs: Job[];

    @ManyToOne((type) => Employee)
    manager: Employee;

    @ManyToOne((type) => Department)
    department: Department;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
