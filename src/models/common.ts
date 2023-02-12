export abstract class SerializedObject {
    abstract toEncode(): string;
    abstract toDecode(content: string): void;
}
