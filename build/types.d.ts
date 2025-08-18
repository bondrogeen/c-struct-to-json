export type StructField = {
    type: string;
    name: string;
    length?: number;
    byteOffset?: number;
};
export type StructsMap = Record<string, StructField[]>;
export type ParseStructResult = {
    keys: string[];
    structs: StructsMap;
};
export type IntType = 'Int8' | 'Int16' | 'Int32' | 'Uint8' | 'Uint16' | 'Uint32' | 'Float32';
export interface IntOptions {
    byteLength: number;
    type: IntType;
    byteOffset: number;
    littleEndian?: boolean;
    length?: number;
}
