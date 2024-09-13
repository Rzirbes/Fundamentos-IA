class RedeNeural {
    constructor(tamanhoEntrada, tamanhoOculto, tamanhoSaida) {
        this.tamanhoEntrada = tamanhoEntrada;
        this.tamanhoOculto = tamanhoOculto;
        this.tamanhoSaida = tamanhoSaida;

        // Inicializando pesos aleatórios para a camada oculta e a camada de saída
        this.pesosEntradaOculto = this.inicializarPesos(tamanhoEntrada, tamanhoOculto);
        this.pesosOcultoSaida = this.inicializarPesos(tamanhoOculto, tamanhoSaida);
    }

    inicializarPesos(linhas, colunas) {
        let pesos = [];
        for (let i = 0; i < linhas; i++) {
            let linhaPesos = [];
            for (let j = 0; j < colunas; j++) {
                linhaPesos.push(Math.random() * 2 - 1); // valores entre -1 e 1
            }
            pesos.push(linhaPesos);
        }
        return pesos;
    }

    sigmoide(x) {
        return 1 / (1 + Math.exp(-x));
    }

    derivadaSigmoide(x) {
        return x * (1 - x);
    }

    feedforward(entradaMatriz) {
        let entrada = this.achatar(entradaMatriz);

        // Camada oculta
        this.saidaOculta = this.multiplicarMatriz(entrada, this.pesosEntradaOculto).map(x => this.sigmoide(x));

        // Camada de saída
        this.saidaFinal = this.multiplicarMatriz(this.saidaOculta, this.pesosOcultoSaida).map(x => this.sigmoide(x));

        // Arredondar cada valor para 0 ou 1
        return this.saidaFinal.map(valor => (valor >= 0.90 ? 1 : 0));
    }

    // Classificação: Selecionar o índice com o maior valor na saída
    classificar(entradaMatriz) {
        const saida = this.feedforward(entradaMatriz);
        // Seleciona o índice do maior valor na saída
        const numero = saida.indexOf(Math.max(...saida));
        return `Número ${numero}`;
    }

    treinar(entradaMatriz, saidaEsperada, taxaAprendizagem) {
        let entrada = this.achatar(entradaMatriz);

        this.feedforward(entradaMatriz);

        let erroSaida = [];
        for (let i = 0; i < saidaEsperada.length; i++) {
            erroSaida.push(saidaEsperada[i] - this.saidaFinal[i]);
        }

        let ajustesSaida = [];
        for (let i = 0; i < erroSaida.length; i++) {
            ajustesSaida.push(erroSaida[i] * this.derivadaSigmoide(this.saidaFinal[i]));
        }

        // Ajuste dos pesos da camada oculta para a camada de saída
        for (let i = 0; i < this.pesosOcultoSaida.length; i++) {
            for (let j = 0; j < this.pesosOcultoSaida[i].length; j++) {
                this.pesosOcultoSaida[i][j] += taxaAprendizagem * ajustesSaida[j] * this.saidaOculta[i];
            }
        }

        // Calculando o erro da camada oculta
        let erroOculto = [];
        for (let i = 0; i < this.pesosEntradaOculto[0].length; i++) {
            let erro = 0;
            for (let j = 0; j < ajustesSaida.length; j++) {
                erro += ajustesSaida[j] * this.pesosOcultoSaida[i][j];
            }
            erroOculto.push(erro);
        }

        // Ajuste dos pesos da camada de entrada para a camada oculta
        let ajustesOculto = [];
        for (let i = 0; i < erroOculto.length; i++) {
            ajustesOculto.push(erroOculto[i] * this.derivadaSigmoide(this.saidaOculta[i]));
        }

        for (let i = 0; i < this.pesosEntradaOculto.length; i++) {
            for (let j = 0; j < this.pesosEntradaOculto[i].length; j++) {
                this.pesosEntradaOculto[i][j] += taxaAprendizagem * ajustesOculto[j] * entrada[i];
            }
        }
    }

    multiplicarMatriz(vetor, matriz) {
        let resultado = [];
        if (vetor.length !== matriz.length) {
            throw new Error(`Dimensões incompatíveis: tamanho do vetor (${vetor.length}) e linhas da matriz (${matriz.length})`);
        }

        for (let j = 0; j < matriz[0].length; j++) {
            let soma = 0;
            for (let i = 0; i < vetor.length; i++) {
                soma += vetor[i] * matriz[i][j];
            }
            resultado.push(soma);
        }
        return resultado;
    }

    achatar(matriz) {
        return matriz.flat();
    }
}

let rede = new RedeNeural(48, 96, 10);

let treinamento = [
    {
        entrada: [
            [0, 0, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 0, 1, 1, 1, 0]
        ], saida: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },  // Número 0

    {
        entrada: [
            [0, 0, 0, 1, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 1, 0, 1, 0, 0],
            [1, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0]
        ], saida: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
    },  // Número 1

    {
        entrada: [
            [1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1]
        ], saida: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
    },  // Número 2

    {
        entrada: [
            [1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1]
        ], saida: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
    },  // Número 3

    {
        entrada: [
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1]
        ], saida: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
    },  // Número 4

    {
        entrada: [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1]
        ], saida: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
    },  // Número 5

    {
        entrada: [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1]
        ], saida: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
    },  // Número 6

    {
        entrada: [
            [1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0]
        ], saida: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
    },  // Número 7

    {
        entrada: [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1]
        ], saida: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
    },  // Número 8

    {
        entrada: [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1]
        ], saida: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
    }   // Número 9
];

// Treinando a rede
for (let i = 0; i < 1000; i++) {
    for (let dados of treinamento) {
        rede.treinar(dados.entrada, dados.saida, 0.1);
    }
}

// Testando a rede
console.log(rede.classificar([
    [0, 0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 1],
    [0, 0, 1, 1, 1, 0]
]));

console.log(rede.classificar([
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1]
]));

console.log(rede.classificar([
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0]
]));
