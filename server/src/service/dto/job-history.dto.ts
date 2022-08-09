/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { JobDTO } from './job.dto';
import { DepartmentDTO } from './department.dto';
import { EmployeeDTO } from './employee.dto';
import { Language } from '../../domain/enumeration/language';

/**
 * A JobHistoryDTO object.
 */
export class JobHistoryDTO extends BaseDTO {
    @ApiModelProperty({ description: 'startDate field', required: false })
    startDate: any;

    @ApiModelProperty({ description: 'endDate field', required: false })
    endDate: any;

    @ApiModelProperty({ enum: Language, description: 'language enum field', required: false })
    language: Language;

    @ApiModelProperty({ type: JobDTO, description: 'job relationship' })
    job: JobDTO;

    @ApiModelProperty({ type: DepartmentDTO, description: 'department relationship' })
    department: DepartmentDTO;

    @ApiModelProperty({ type: EmployeeDTO, description: 'employee relationship' })
    employee: EmployeeDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
