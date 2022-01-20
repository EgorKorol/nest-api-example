import { PageModel } from './page.model';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
  controllers: [PageController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: PageModel,
        schemaOptions: {
          collection: 'Page',
        },
      },
    ]),
  ],
  providers: [PageService],
})
export class PageModule {}
