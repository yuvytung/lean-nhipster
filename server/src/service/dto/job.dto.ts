/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { TaskDTO } from './task.dto';
import { EmployeeDTO } from './employee.dto';

/**
 * A JobDTO object.
 */
export class JobDTO extends BaseDTO {
    @ApiModelProperty({ description: 'jobTitle field', required: false })
    jobTitle: string;

    @ApiModelProperty({ description: 'minSalary field', required: false })
    minSalary: number;

    @ApiModelProperty({ description: 'maxSalary field', required: false })
    maxSalary: number;

    @ApiModelProperty({ type: TaskDTO, isArray: true, description: 'tasks relationship' })
    tasks: TaskDTO[];

    @ApiModelProperty({ type: EmployeeDTO, description: 'employee relationship' })
    employee: EmployeeDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
