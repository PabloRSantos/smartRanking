import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Challenge } from './interfaces/challenge.interface';
import { ChallengeStatus } from './interfaces/challengeStatus.enum';

@Injectable()
export class ChallengesService {
  private readonly logger = new Logger(ChallengesService.name);

  constructor(
    @InjectModel('Challenges')
    private readonly challengeModel: Model<Challenge>,
  ) {}

  async createChallenge(challenge: Challenge): Promise<Challenge> {
    try {
      const newChallenge = new this.challengeModel(challenge);
      newChallenge.status = ChallengeStatus.PENDENTE;
      return newChallenge.save();
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }

  async getChallengeById(challengeId: string): Promise<Challenge> {
    try {
      return await this.challengeModel.findById(challengeId).populate('game');
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }

  async getChallengeOfPlayer(playerId: string): Promise<Array<Challenge>> {
    try {
      return await this.challengeModel
        .find()
        .where('players')
        .in([playerId])
        .populate('game');
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }

  async getAllChallenges(): Promise<Array<Challenge>> {
    try {
      return await this.challengeModel.find().populate('game');
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }

  async updateChallenge(challenge: Challenge, id: string): Promise<void> {
    try {
      challenge.dateTimeChallenge = new Date();

      await this.challengeModel.findByIdAndUpdate(id, challenge);
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }

  async updateGameChallenge(
    idGame: string,
    challenge: Challenge,
  ): Promise<void> {
    try {
      challenge.status = ChallengeStatus.REALIZADO;
      challenge.game = idGame;

      console.log(challenge);

      await this.challengeModel.findByIdAndUpdate(challenge._id, challenge);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async deleteChallenge(id: string): Promise<void> {
    try {
      await this.challengeModel.findByIdAndUpdate(id, {
        status: ChallengeStatus.CANCELADO,
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new RpcException(error.message);
    }
  }
}
