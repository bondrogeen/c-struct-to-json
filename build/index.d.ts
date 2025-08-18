import type { StructField, ParseStructResult } from './types';
type StructInput = Record<string, number | number[] | string>;
declare class Struct {
    #private;
    constructor(array: StructField[]);
    static parseStruct(data: string): ParseStructResult;
    init(array: StructField[]): void;
    private getInstanceData;
    get length(): number;
    getObject(): StructInput;
    setObject(object: StructInput): this;
    getBuffer(): ArrayBuffer;
    setBuffer(buffer: ArrayBuffer): this;
}
export default Struct;
