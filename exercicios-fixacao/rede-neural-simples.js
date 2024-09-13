class RedeNeuralSimples {
    constructor(){
        this.peso = Math.random() * 2 -1
    }

    sigmoide(x) {
        return 1 / (1 + Math.exp(-x));
    }

    derivadaSigmoide(x) {
        return x * (1 - x);
    }

    feedforward(entrada) {
        let soma = entrada * this.peso;
        return this.sigmoide(soma);
    }
}