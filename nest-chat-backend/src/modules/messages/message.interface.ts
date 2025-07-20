import { MessageModel } from './message.model';

export enum MessageType {
  TEXT = 'text',
  FILE = 'file',
}

export enum MessageStatus {
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
}

export type OutputMessageItem = Partial<MessageModel>;
