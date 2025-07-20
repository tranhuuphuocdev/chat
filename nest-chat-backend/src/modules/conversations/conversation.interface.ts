import { ConversationModel } from './conversation.model';

export enum ConversationType {
  FRIEND = 'friend',
  GROUP = 'group',
}

export type OutputConversationItem = Partial<ConversationModel>;
