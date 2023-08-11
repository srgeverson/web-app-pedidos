export const formataDataEHora = (dataParaTratar) => {
    const novaData = new Date(dataParaTratar);
    if (dataParaTratar)
        return novaData.toLocaleString('pt-BR', { timezone: 'UTC' });
    else
        return '';
}

export const formataMoeda = (numeroParaTratar) => {
    const novoValor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    if (numeroParaTratar)
        return novoValor.format(numeroParaTratar);
    else
        return novoValor.format(0);
}