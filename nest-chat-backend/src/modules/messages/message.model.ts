import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { MessageStatus, MessageType } from './message.interface';

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'Conversation', required: true })
  conversationId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  sender: Types.ObjectId;

  @Prop()
  content: string;

  @Prop({ enum: MessageType, default: MessageType.TEXT })
  messageType: string;

  @Prop({ enum: MessageStatus, default: MessageStatus.SENT })
  status: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

export interface MessageModel extends Document {
  _id: Types.ObjectId;
  conversationId: Types.ObjectId;
  sender: Types.ObjectId;
  content: string;
  messageType: string;
  status: string;
  updatedAt: Date;
  createdAt: Date;
}
