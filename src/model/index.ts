export type Transactions = {
    id: number;
    date: string;
    category: string;
    type: string;
    amount: number;
}
type category =  Pick<Transactions,'category'>
const category:  keyof Transactions = "category"; // ✅
