import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../impl/user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  handle(event: UserCreatedEvent) {
    console.log(
      `User créée: ${event.nom} ${event.prenom} Role: ${event.roles} CreatedAt: ${event.createdAt.getDate()}`,
    );
    // Ici, vous pourriez – Envoyer un email
    // - Mettre à jour un cache
    // - Notifier d'autres services
    // - Mettre à jour une vue dénormalisée.
  }
}
