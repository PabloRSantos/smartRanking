import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { PlayersModule } from './players/players.module';
import { AwsModule } from './aws/aws.module';
import { ChallengesModule } from './challenges/challenges.module';
import { RankingsModule } from './rankings/rankings.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [CategoryModule, PlayersModule, AwsModule, ChallengesModule, RankingsModule, AuthModule],
})
export class AppModule {}
