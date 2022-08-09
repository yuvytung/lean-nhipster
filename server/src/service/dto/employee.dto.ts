/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { JobDTO } from './job.dto';
import { DepartmentDTO } from './department.dto';

/**
 * A EmployeeDTO object.
 */
export class EmployeeDTO extends BaseDTO {
    /**
     * The firstname attribute.
     */
    @ApiModelProperty({ description: 'The firstname attribute.', required: false })
    firstName: string;

    @ApiModelProperty({ description: 'lastName field', required: false })
    lastName: string;

    @ApiModelProperty({ description: 'email field', required: false })
    email: string;

    @ApiModelProperty({ description: 'phoneNumber field', required: false })
    phoneNumber: string;

    @ApiModelProperty({ description: 'hireDate field', required: false })
    hireDate: any;

    @ApiModelProperty({ description: 'salary field', required: false })
    salary: number;

    @ApiModelProperty({ description: 'commissionPct field', required: false })
    commissionPct: number;

    @ApiModelProperty({ type: JobDTO, isArray: true, description: 'jobs relationship' })
    jobs: JobDTO[];

    @ApiModelProperty({ type: EmployeeDTO, description: 'manager relationship' })
    manager: EmployeeDTO;

    @ApiModelProperty({ type: DepartmentDTO, description: 'department relationship' })
    department: DepartmentDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
