import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { TaskDTO } from '../src/service/dto/task.dto';
import { TaskService } from '../src/service/task.service';

describe('Task Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId',
    };

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock,
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue(authGuardMock)
            .overrideGuard(RolesGuard)
            .useValue(rolesGuardMock)
            .overrideProvider(TaskService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all tasks ', async () => {
        const getEntities: TaskDTO[] = (await request(app.getHttpServer()).get('/api/tasks').expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET tasks by id', async () => {
        const getEntity: TaskDTO = (
            await request(app.getHttpServer())
                .get('/api/tasks/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create tasks', async () => {
        const createdEntity: TaskDTO = (
            await request(app.getHttpServer()).post('/api/tasks').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update tasks', async () => {
        const updatedEntity: TaskDTO = (
            await request(app.getHttpServer()).put('/api/tasks').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update tasks from id', async () => {
        const updatedEntity: TaskDTO = (
            await request(app.getHttpServer())
                .put('/api/tasks/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE tasks', async () => {
        const deletedEntity: TaskDTO = (
            await request(app.getHttpServer())
                .delete('/api/tasks/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
