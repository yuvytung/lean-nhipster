/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Location } from './location.entity';
import { Employee } from './employee.entity';

/**
 * A Department.
 */
@Entity('department')
export class Department extends BaseEntity {
    @Column({ name: 'department_name' })
    departmentName: string;

    @OneToOne((type) => Location)
    @JoinColumn()
    location: Location;

    @OneToMany((type) => Employee, (other) => other.department)
    employees: Employee[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
