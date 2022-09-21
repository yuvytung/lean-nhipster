import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JobDTO } from "./dto/job.dto";
import { JobMapper } from "./mapper/job.mapper";
import { JobRepository } from "../repository/job.repository";
import { AbstractBaseService } from "./abstract.base.service";
import { Job } from "../domain/job.entity";
import { JobSearchRepository } from "../repository/search/job.search.repository";

const relationshipNames = [];
//relationshipNames.push('tasks');

@Injectable()
export class JobService extends AbstractBaseService<Job, JobDTO> {
  constructor(
    @InjectRepository(JobRepository) protected _repository: JobRepository,
    private searchRepository: JobSearchRepository<Job>,
  ) {
    super(_repository, new JobMapper(Job, JobDTO), relationshipNames, searchRepository);
  }
}
