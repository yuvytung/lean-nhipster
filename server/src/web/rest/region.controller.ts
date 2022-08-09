import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post as PostMethod,
    Put,
    UseGuards,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { RegionDTO } from '../../service/dto/region.dto';
import { RegionService } from '../../service/region.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/regions')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('regions')
export class RegionController {
    logger = new Logger('RegionController');

    constructor(private readonly regionService: RegionService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: RegionDTO,
    })
    async getAll(@Req() req: Request): Promise<RegionDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.regionService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: RegionDTO,
    })
    async getOne(@Param('id') id: number): Promise<RegionDTO> {
        return await this.regionService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create region' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: RegionDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() regionDTO: RegionDTO): Promise<RegionDTO> {
        const created = await this.regionService.save(regionDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Region', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update region' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: RegionDTO,
    })
    async put(@Req() req: Request, @Body() regionDTO: RegionDTO): Promise<RegionDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Region', regionDTO.id);
        return await this.regionService.update(regionDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update region with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: RegionDTO,
    })
    async putId(@Req() req: Request, @Body() regionDTO: RegionDTO): Promise<RegionDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Region', regionDTO.id);
        return await this.regionService.update(regionDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete region' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Region', id);
        return await this.regionService.deleteById(id);
    }
}
