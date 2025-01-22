import { useState } from 'react'
import '../assets/styles.css'
import { FaTrashCan } from "react-icons/fa6";

function Carrinho() {
    const [carrinho, setCarrinho] = useState([]);
    const [nomeItem, setNomeItem] = useState('');
    const [quantidadeItem, setQuantidadeItem] = useState(1);
    const [precoItem, setPrecoItem] = useState(0);
    const [codigoDesconto, setCodigoDesconto] = useState('');
    const [total, setTotal] = useState(0);

    const atualizarTotal = (novoCarrinho) => {
        const novoTotal = novoCarrinho.reduce(
            (accumulator, item) => accumulator + item.quantidade * item.preco, 0
        )
        setTotal(novoTotal)
    }

    const adicionarItem = (a) => {
        a.preventDefault();

        const itemExistente = carrinho.find((item) => item.nome === nomeItem)
        let novoCarrinho

        if (itemExistente) {
            novoCarrinho = carrinho.map((item) => 
                item.nome === nomeItem ? { ...item, quantidade: item.quantidade + quantidadeItem } : item
            )
        } else {
            novoCarrinho = [ ...carrinho, { nome: nomeItem, quantidade: quantidadeItem, preco: precoItem },]
        }

        setCarrinho(novoCarrinho)
        atualizarTotal(novoCarrinho)
        setNomeItem('')
        setQuantidadeItem(1)
        setPrecoItem(0)
    }

    const removerItem = (index) => {
        const novoCarrinho = carrinho.filter((_, i) => i !== index)
        setCarrinho(novoCarrinho)
        atualizarTotal(novoCarrinho)
    }

    const aumentarQuantidade = (index) => {
        const novoCarrinho = carrinho.map((item, i) =>
        i === index ? { ...item, quantidade: item.quantidade + 1 } : item)
        setCarrinho(novoCarrinho)
        atualizarTotal(novoCarrinho)
    } 

    const diminuirQuantidade = (index) => {
        const novoCarrinho = carrinho.map((item, i) =>
        i === index && item.quantidade > 1 ? { ...item, quantidade: item.quantidade - 1 } : item)
        setCarrinho(novoCarrinho)
        atualizarTotal(novoCarrinho)
    }

    const aplicarDesconto = (a) => {
        a.preventDefault()

        let desconto = 0
        if (codigoDesconto === 'DESC10') {
            desconto = 0.1
        } else if (codigoDesconto === 'DESC20') {
            desconto = 0.2
        } else if (codigoDesconto === 'DESC30') {
            desconto = 0.3
        } else if (codigoDesconto === 'DESC40') {
            desconto = 0.4
        } else if (codigoDesconto === 'DESC50') {
            desconto = 0.5
        } else {
            alert('Código de Desconto Inválido!')
            return
        }

        const novoTotal = total * (1 - desconto)
        setTotal(novoTotal)
        alert(`Desconto de ${desconto * 100}% Aplicado!`)
        setCodigoDesconto('')
    }

    return(
      <div className="expanded-container">
        <h1>Gerenciador de Carrinho</h1>
        <div className="form">
            <form className="form-item" onSubmit={adicionarItem}>
                <label>Produto:</label>
                <input type="text" value={nomeItem} onChange={(a) => setNomeItem(a.target.value)} placeholder="Nome do Produto" required />
                <label>Quantidade:</label>
                <input type="number" value={quantidadeItem} onChange={(a) => setQuantidadeItem(parseInt(a.target.value))} min="1" required />
                <label>Preço:</label>
                <input type="number" value={precoItem} onChange={(a) => setPrecoItem(parseFloat(a.target.value))} min="0.01" step="0.01" required />
                <button type="submite">Adicionar</button>
            </form>
            <form className="form-desc" onSubmit={aplicarDesconto}>
                <input type="text" value={codigoDesconto} onChange={(a) => setCodigoDesconto(a.target.value)} placeholder="Código de Desconto" />
                <button type="submite">Aplicar</button>
            </form>
            <table className="expanded-table">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Preço Unitário</th>
                        <th>Subtotal</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {carrinho.map((item, index) => (
                        <tr key={index}>
                            <td>{item.nome}</td>
                            <td>
                                <button onClick={() => diminuirQuantidade(index)}>-</button>
                                {item.quantidade}
                                <button onClick={() => aumentarQuantidade(index)}>+</button>
                            </td>
                            <td>R$ {item.preco.toFixed(2)}</td>
                            <td>R$ {(item.quantidade * item.preco).toFixed(2)}</td>
                            <td><button onClick={() => removerItem(index)}><FaTrashCan /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="total">
                <p>Total: R${total.toFixed(2)}</p>
            </div>
        </div>
        <div className="promo">
            <h3>Atenção!</h3>
            <p>Use um dos nossos códigos de Desconto:</p>
            <ul>
                <li>DESC20</li>
                <li>DESC30</li>
                <li>DESC40</li>
                <li>DESC50</li>
            </ul>
        </div>
      </div>
    )
}

export default Carrinho