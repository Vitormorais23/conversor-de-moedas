export class Cotacao {
    bid: number;
    ask: number;
    createDate?: Date | null;

    constructor(value?: any) {
        this.bid = Number(value?.bid)
        this.ask = Number(value?.ask)
        this.createDate = value?.create_date ? new Date(value?.create_date) : null
    }

    getValor(): number {
        return (this.bid + this.ask) / 2
    }
}