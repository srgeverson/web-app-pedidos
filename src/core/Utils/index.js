export const formataDataEHora = (dataParaTratar) => {
    const novaData = new Date(dataParaTratar);
    return novaData.toLocaleString('pt-BR', { timezone: 'UTC' });
}

export const formataMoeda = (numeroParaTratar) => {
    const novoValor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    return novoValor.format(numeroParaTratar);
}