/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { CountryDTO } from './country.dto';

/**
 * A LocationDTO object.
 */
export class LocationDTO extends BaseDTO {
    @ApiModelProperty({ description: 'streetAddress field', required: false })
    streetAddress: string;

    @ApiModelProperty({ description: 'postalCode field', required: false })
    postalCode: string;

    @ApiModelProperty({ description: 'city field', required: false })
    city: string;

    @ApiModelProperty({ description: 'stateProvince field', required: false })
    stateProvince: string;

    @ApiModelProperty({ type: CountryDTO, description: 'country relationship' })
    country: CountryDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
