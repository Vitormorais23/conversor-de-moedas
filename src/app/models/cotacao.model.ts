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
        this.name = String(value?.name?.substring(0, value?.name?.indexOf('/')))
        this.varBid = Number(value?.varBid)
        this.bid = Number(value?.bid)
        this.ask = Number(value?.ask)
        this.createDate = value?.create_date ? new Date(value?.create_date) : null
    }

    getValor(): number {
        return (this.bid + this.ask) / 2
    }

    getVariacao(): string {
        let prefix = ''
        // if (typeof this.varBid === 'number' && this.varBid > 0) {
        //     prefix = "+"
        // }
        // Forma de forçar o TypeScript ver que é um number
        if ((this.varBid as number) > 0) {
            prefix = '+'
        }
        return prefix + this.varBid?.toFixed(4)
    }

    getValorMonetario(): string {
        return Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: String(this.codein),
            maximumFractionDigits: 4,
            minimumFractionDigits: 4,
          }).format(this.getValor())
    }
}