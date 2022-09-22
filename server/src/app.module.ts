import {
  CacheModule,
  Module
} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./module/auth.module";
import { ormConfig } from "./orm.config";
import { config } from "./config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { JobModule } from "./module/job.module";
import { InjectRedis, RedisModule } from "@liaoliaots/nestjs-redis";
import { CacheService } from "./index";
import {AuthService} from "./service/auth.service";
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

class GlobalInit{
  constructor(@InjectRedis() private readonly cache: CacheService) {
    this.cache.quick = async (key,callback)=> {
      let result = await this.cache.get(key.toString())
        .then((r) => JSON.parse(r))
      if (!result) {
        result = await callback();
        this.cache.set(key, JSON.stringify(result))
      }
      return result;
    }
  }
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    ServeStaticModule.forRoot({
      rootPath: config.getClientPath(),
    }),
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: [{
          host: 'localhost',
          port: 6379,
        }]
      })
    }),

    AuthModule,
    JobModule,
    // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
  ],
  controllers: [
    // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
  ],
  providers: [
    GlobalInit,
    // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
  ],
})
export class AppModule {}
