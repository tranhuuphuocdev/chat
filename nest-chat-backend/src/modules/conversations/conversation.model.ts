import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ConversationType } from './conversation.interface';

@Schema({ timestamps: true })
export class Conversation {
  @Prop({ type: ConversationType, default: ConversationType.FRIEND })
  conversationType: ConversationType;

  @Prop({ type: [String], required: true })
  participants: string[];

  @Prop({ type: String })
  name?: string;

  @Prop({ type: Types.ObjectId, ref: 'Message' })
  lastMessage?: Types.ObjectId;

  @Prop({ type: String })
  avatar?: string;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);

export interface ConversationModel extends Document {
  _id: Types.ObjectId;
  conversationType: ConversationType;
  participants: string[];
  name?: string;
  lastMessage?: Types.ObjectId;
  avatar?: string;
}
