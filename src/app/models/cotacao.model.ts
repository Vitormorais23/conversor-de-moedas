export class Cotacao {
    bid: number;
    ask: number;
    createDate?: Date | null;

    constructor(value?: any) {
        this.bid = value?.bid ?? 0
        this.ask = value?.ask ?? 0
        this.createDate = value?.create_date ? new Date(value?.create_date) : null
    }

    getValor(): number {
        return (this.bid + this.ask) / 2
    }
}