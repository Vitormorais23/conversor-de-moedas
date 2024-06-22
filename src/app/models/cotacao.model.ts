export class Cotacao {
    code: String;
    codein: String;
    name: string;
    varBid: Number;
    bid: number;
    ask: number;
    createDate?: Date | null;

    constructor(value?: any) {
        this.code = String(value?.code)
        this.codein = String(value?.codein)
        this.name = String(value?.name)
        this.varBid = Number(value?.varBid)
        this.bid = Number(value?.bid)
        this.ask = Number(value?.ask)
        this.createDate = value?.create_date ? new Date(value?.create_date) : null
    }

    getValor(): number {
        return (this.bid + this.ask) / 2
    }
}