export type SystemChatMessageTypes = Exclude<
  foundry.documents.BaseChatMessage.TypeNames, 'base'
>;

interface BloodAndDoomChatMessage<
  ChatMessageType extends SystemChatMessageTypes = SystemChatMessageTypes
> {
  type: ChatMessageType;
  system: DataModelConfig['ChatMessage'][ChatMessageType];
}

class BloodAndDoomChatMessage extends ChatMessage {
  /** ------------------------------------------------------ */
  /**                    Type Helpers                        */
  /** ------------------------------------------------------ */
  isType<
    TypeName extends SystemChatMessageTypes
  >(type: TypeName): this is BloodAndDoomChatMessage<TypeName> {
    return type === this.type as SystemChatMessageTypes;
  }

  /** ------------------------------------------------------ */
  /**                     Data Prep                          */
  /** ------------------------------------------------------ */
}

export { BloodAndDoomChatMessage };
