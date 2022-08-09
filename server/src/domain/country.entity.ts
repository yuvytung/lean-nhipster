/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Region } from './region.entity';

/**
 * A Country.
 */
@Entity('country')
export class Country extends BaseEntity {
    @Column({ name: 'country_name', nullable: true })
    countryName: string;

    @OneToOne((type) => Region)
    @JoinColumn()
    region: Region;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
