import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PageModule } from './page/page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [AuthModule, PageModule, ProductModule, ReviewModule],
  controllers: [AppController],
})
export class AppModule {}
