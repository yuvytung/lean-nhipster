/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Region.
 */
@Entity('region')
export class Region extends BaseEntity {
    @Column({ name: 'region_name', nullable: true })
    regionName: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
