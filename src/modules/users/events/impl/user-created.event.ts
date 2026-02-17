import { users_roles } from '../../../../../generated/prisma/enums';

export class UserCreatedEvent {
  constructor(
    public readonly nom: string,
    public readonly prenom: string,
    public readonly roles: users_roles,
    public readonly createdAt: Date,
  ) {}
}
