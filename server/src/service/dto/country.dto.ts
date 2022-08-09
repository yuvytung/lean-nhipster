/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { RegionDTO } from './region.dto';

/**
 * A CountryDTO object.
 */
export class CountryDTO extends BaseDTO {
    @ApiModelProperty({ description: 'countryName field', required: false })
    countryName: string;

    @ApiModelProperty({ type: RegionDTO, description: 'region relationship' })
    region: RegionDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
