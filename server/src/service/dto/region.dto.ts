/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

/**
 * A RegionDTO object.
 */
export class RegionDTO extends BaseDTO {
    @ApiModelProperty({ description: 'regionName field', required: false })
    regionName: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
