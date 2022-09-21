/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

//import { Task } from './task.entity';

/**
 * A Job.
 */
@Entity('job')
export class Job extends BaseEntity {
    @Column({ name: 'job_title', nullable: true })
    jobTitle: string;

    @Column({ name: 'min_salary', nullable: true })
    minSalary: string;

    @Column({ name: 'max_salary', nullable: true })
    maxSalary: string;

//    @ManyToMany(type => Task)
//    @JoinTable({
//        name: 'rel_job__task',
//        joinColumn: { name: 'job_id', referencedColumnName: 'id' },
//        inverseJoinColumn: { name: 'task_id', referencedColumnName: 'id' },
//    })
//    tasks: Task[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
