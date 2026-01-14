import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // On changera cela pour o2switch plus tard
      port: 5432,
      username: 'cuistot',
      password: 'cuistot_pass',
      database: 'cuistotfamily',
      autoLoadEntities: true,
      synchronize: true, // Désactiver en production (o2switch)
    }),
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}