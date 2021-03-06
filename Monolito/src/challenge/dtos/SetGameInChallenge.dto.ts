import { IsNotEmpty } from 'class-validator'; 
import {Player} from '../../players/interfaces/player.interface'

import { Result } from '../interfaces/challenge.interface';

export class SetGameInChallengeDto {
  @IsNotEmpty()
  def: Player;

  @IsNotEmpty()
  result: Array<Result>;
}
