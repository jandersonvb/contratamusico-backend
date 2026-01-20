import { IsString, IsIn, IsNotEmpty } from 'class-validator';

export const BOOKING_STATUSES = [
  'pendente',
  'negociando',
  'confirmado',
  'cancelado',
  'concluido',
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export class UpdateBookingStatusDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(BOOKING_STATUSES)
  status: BookingStatus;
}

