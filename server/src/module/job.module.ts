import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobController } from "../web/rest/job.controller";
import { JobRepository } from "../repository/job.repository";
import { JobService } from "../service/job.service";
import { ElasticSearchModule } from "./elasticsearch.module";
import { JobSearchRepository } from "../repository/search/job.search.repository";

@Module({
  imports: [TypeOrmModule.forFeature([JobRepository]), ElasticSearchModule],
  controllers: [JobController],
  providers: [JobService, JobSearchRepository],
  exports: [JobService],
})
export class JobModule {}
