
const itens_obj = {
    "cafe": 3.00,
    "chantily": 1.50,
    "suco": 6.20,
    "sanduiche": 6.50,
    "queijo": 2.00,
    "salgado": 7.25,
    "combo1": 9.50,
    "combo2": 7.50,
};

const TAXAS = 0.03;
const DESCONTOS = 0.05;

class CaixaDaLanchonete {
    verificarChaves({ codigo, descricao, valor }) {
        if (!codigo || !descricao || !valor) return 'Não há itens no carrinho de compra!';
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.length === 0 || itens === undefined) return "Não há itens no carrinho de compra!";
        

        let total = 0.0;
        const nomes_items = [];

        for(const item of itens) {
            const itemNome = item.split(',')[0];
            nomes_items.push(itemNome);
        }

        for (const item of itens) {
            const [itemNome, itemQtd] = item.split(',');
            
            if (!itens_obj.hasOwnProperty(itemNome)) return "Item inválido!";
            if(itemQtd <= 0) return "Quantidade inválida!";
            if ((itemNome === 'chantily' && !nomes_items.includes('cafe')) ||
                (itemNome === 'queijo' && !nomes_items.includes('sanduiche')))  return "Item extra não pode ser pedido sem o principal";

            total += itens_obj[itemNome] * itemQtd;
        }

        let retorno = total;

        if (metodoDePagamento === 'credito') {
            retorno += retorno * TAXAS;
        } else if (metodoDePagamento === 'dinheiro') {
            retorno -= retorno * DESCONTOS;
        } else if (metodoDePagamento !== 'debito') {
            return "Forma de pagamento inválida!";
        }

        retorno = Number(retorno.toFixed(2));
        return retorno.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    }
}

export { CaixaDaLanchonete };
