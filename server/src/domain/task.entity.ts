/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Job } from './job.entity';

/**
 * Task entity.\n@author The JHipster team.
 */
@Entity('task')
export class Task extends BaseEntity {
    @Column({ name: 'title', nullable: true })
    title: string;

    @Column({ name: 'description', nullable: true })
    description: string;

    @ManyToMany((type) => Job)
    jobs: Job[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
