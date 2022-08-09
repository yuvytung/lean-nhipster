/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { LocationDTO } from './location.dto';
import { EmployeeDTO } from './employee.dto';

/**
 * A DepartmentDTO object.
 */
export class DepartmentDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'departmentName field' })
    departmentName: string;

    @ApiModelProperty({ type: LocationDTO, description: 'location relationship' })
    location: LocationDTO;

    @ApiModelProperty({ type: EmployeeDTO, isArray: true, description: 'employees relationship' })
    employees: EmployeeDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
