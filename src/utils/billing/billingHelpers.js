export function calculateTotal(quantity,price){

    return Number(quantity)*Number(price);

}

export function generateInvoiceNumber(){

    const date=new Date();

    return `INV-${date.getFullYear()}${String(date.getMonth()+1).padStart(2,"0")}-${Date.now()}`;

}