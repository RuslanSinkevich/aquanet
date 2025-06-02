import { PartialType } from '@nestjs/swagger';
import { CreateUtilitySegmentDto } from './create-utility-segment.dto';

export class UpdateUtilitySegmentDto extends PartialType(CreateUtilitySegmentDto) {} 