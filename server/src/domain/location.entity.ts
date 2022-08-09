/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Country } from './country.entity';

/**
 * not an ignored comment
 */
@Entity('location')
export class Location extends BaseEntity {
    @Column({ name: 'street_address', nullable: true })
    streetAddress: string;

    @Column({ name: 'postal_code', nullable: true })
    postalCode: string;

    @Column({ name: 'city', nullable: true })
    city: string;

    @Column({ name: 'state_province', nullable: true })
    stateProvince: string;

    @OneToOne((type) => Country)
    @JoinColumn()
    country: Country;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
