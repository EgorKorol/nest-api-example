import { PageService } from './page.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { FindPageDTO } from './dto/find-page.dto';
import { PAGE_ERRORS } from './constants';
import { CreatePageDTO } from './dto/create-page.dto';
import { JWTAuthGuard } from '../auth/guards/jwt.guard';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreatePageDTO) {
    return this.pageService.create(dto);
  }

  @UseGuards(JWTAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const page = await this.pageService.findById(id);

    if (!page) {
      throw new NotFoundException(PAGE_ERRORS.NOT_FOUND);
    }

    return page;
  }

  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedProduct = await this.pageService.deleteById(id);

    if (!deletedProduct) {
      throw new NotFoundException(PAGE_ERRORS.NOT_FOUND);
    }
  }

  @UseGuards(JWTAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreatePageDTO,
  ) {
    const updatedPage = await this.pageService.updateById(id, dto);

    if (!updatedPage) {
      throw new NotFoundException(PAGE_ERRORS.NOT_FOUND);
    }

    return updatedPage;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() { firstCategory }: FindPageDTO) {
    return this.pageService.findByCategory(firstCategory);
  }

  @Get('textSearch/:text')
  async textSearch(@Param('text') text: string) {
    return this.pageService.findByText(text);
  }
}
