import { ReviewService } from './review.service';
import { CreateReviewDTO } from './dto/create-review.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { REVIEW_ERRORS } from './constants';
import { JWTAuthGuard } from '../auth/guards/jwt.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDTO) {
    return this.reviewService.create(dto);
  }

  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.reviewService.delete(id);

    if (!deleted) {
      throw new HttpException(REVIEW_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    return this.reviewService.findByProductId(productId);
  }
}
