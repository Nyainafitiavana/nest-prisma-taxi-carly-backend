import { Users_roles } from '../../../../../generated/prisma/enums';

export class UserCreatedEvent {
  constructor(
    public readonly nom: string,
    public readonly prenom: string,
    public readonly roles: Users_roles,
    public readonly createdAt: Date,
  ) {}
}
