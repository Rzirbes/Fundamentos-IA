let perguntas = [
    {
        identificador: "inicio-react",
        pergunta: "Você está enfrentando algum problema com o estado dos componentes em React?",
        respostas: [
            {
                respostaPossivel: "Sim, o estado não está atualizando corretamente",
                redireciona: "verificar-hook"
            },
            {
                respostaPossivel: "Sim, o componente está renderizando muitas vezes",
                redireciona: "verificar-uso-effect"
            },
            {
                respostaPossivel: "Não, o problema é outro",
                redireciona: "problema-performance"
            }
        ]
    },
    {
        identificador: "verificar-hook",
        pergunta: "Você está usando o hook `useState` ou `useReducer` corretamente para controlar o estado?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "verificar-renderizacao"
            },
            {
                respostaPossivel: "Não tenho certeza",
                redireciona: "diagnostico-estado",
                diagnostico: "Verifique se está atualizando o estado corretamente. Em `useState`, sempre use o setter, e no `useReducer`, certifique-se que o reducer está retornando um novo estado."
            },
            {
                respostaPossivel: "Não",
                redireciona: "explicacao-uso-hook"
            }
        ]
    },
    {
        identificador: "verificar-renderizacao",
        pergunta: "O problema pode estar relacionado à re-renderização desnecessária. O componente está renderizando múltiplas vezes?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "verificar-uso-effect"
            },
            {
                respostaPossivel: "Não",
                redireciona: "problema-performance"
            }
        ]
    },
    {
        identificador: "verificar-uso-effect",
        pergunta: "Você está usando o hook `useEffect`? Caso sim, você está passando as dependências corretamente?",
        respostas: [
            {
                respostaPossivel: "Sim, as dependências estão corretas",
                redireciona: "diagnostico-effect",
                diagnostico: "Mesmo com as dependências corretas, pode haver problemas se a função dentro de `useEffect` estiver causando loops de renderização. Verifique a lógica interna."
            },
            {
                respostaPossivel: "Não, estou esquecendo de passar as dependências",
                redireciona: "diagnostico-dependencias-effect",
                diagnostico: "Esquecer de passar dependências no `useEffect` pode causar re-renderizações desnecessárias ou comportamento inesperado. Passe todas as dependências necessárias no array."
            },
            {
                respostaPossivel: "Não sei",
                redireciona: "explicacao-use-effect"
            }
        ]
    },
    {
        identificador: "problema-performance",
        pergunta: "Você está enfrentando problemas de performance no React, como renderizações lentas?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "verificar-uso-memo"
            },
            {
                respostaPossivel: "Não",
                redireciona: "fim"
            }
        ]
    },
    {
        identificador: "verificar-uso-memo",
        pergunta: "Você está utilizando o `React.memo` ou `useMemo` para evitar re-renderizações desnecessárias?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "diagnostico-memo",
                diagnostico: "Certifique-se de que está utilizando `React.memo` ou `useMemo` corretamente, memoizando componentes e funções que não precisam ser re-renderizadas."
            },
            {
                respostaPossivel: "Não",
                redireciona: "explicacao-memo"
            },
            {
                respostaPossivel: "Não sei",
                redireciona: "explicacao-memo"
            }
        ]
    },
    {
        identificador: "explicacao-uso-hook",
        pergunta: "Certifique-se de que está utilizando o `useState` corretamente. Sempre use o setter para atualizar o estado e evite modificar o estado diretamente.",
        respostas: [
            {
                respostaPossivel: "Entendi, vou revisar",
                redireciona: "fim"
            }
        ]
    },
    {
        identificador: "explicacao-use-effect",
        pergunta: "O `useEffect` precisa de um array de dependências como segundo argumento para controlar quando o efeito deve ser executado. Não passar dependências pode causar loops de renderização.",
        respostas: [
            {
                respostaPossivel: "Entendi, vou revisar",
                redireciona: "fim"
            }
        ]
    },
    {
        identificador: "explicacao-memo",
        pergunta: "O `React.memo` evita re-renderizações desnecessárias em componentes que não mudam de estado. O `useMemo` pode ser usado para memoizar valores complexos ou funções.",
        respostas: [
            {
                respostaPossivel: "Entendi, vou aplicar",
                redireciona: "fim"
            }
        ]
    },
    {
        identificador: "diagnostico-estado",
        pergunta: "Certifique-se de estar utilizando corretamente o hook de estado. Não modifique diretamente o estado e use sempre a função de atualização.",
        respostas: [
            {
                respostaPossivel: "Entendido",
                redireciona: "fim"
            }
        ]
    },
    {
        identificador: "diagnostico-effect",
        pergunta: "Revise a lógica interna do `useEffect` para evitar re-renderizações desnecessárias. Isso pode melhorar a performance do componente.",
        respostas: [
            {
                respostaPossivel: "Entendido",
                redireciona: "fim"
            }
        ]
    },
    {
        identificador: "diagnostico-dependencias-effect",
        pergunta: "Esqueceu de passar dependências no `useEffect`? Certifique-se de sempre incluir todas as variáveis externas ao componente no array de dependências.",
        respostas: [
            {
                respostaPossivel: "Entendido",
                redireciona: "fim"
            }
        ]
    },
    {
        identificador: "diagnostico-memo",
        pergunta: "Usar `React.memo` ou `useMemo` corretamente pode evitar renderizações desnecessárias e otimizar a performance.",
        respostas: [
            {
                respostaPossivel: "Entendido",
                redireciona: "fim"
            }
        ]
    },
    {
        identificador: "fim",
        pergunta: "Obrigado por utilizar o fluxo de diagnóstico para React. Espero que tenha ajudado!",
        respostas: []
    }
];


diagnostico = []

const readline = require('readline');

const respostaInterface = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
);

async function fazPergunta(pergunta) {
    return new Promise((resolve) => {
        respostaInterface.question(pergunta, (resposta) => {
            resolve(resposta);
        })
    })
}

Object.prototype.hasOwnProperty = function (property) {
    return this[property] !== undefined;
}

async function processaNode(node) {

    let opcoes = "\n";
    for (let index = 0; index < node.respostas.length; index++) {
        opcoes += (index + 1) + " - " + node.respostas[index].respostaPossivel + "\n";
    }

    // node.respostas
    let respostaEscolhida = await fazPergunta(node.pergunta + opcoes)

    if (node.respostas[respostaEscolhida - 1].hasOwnProperty('diagnostico')) {
        diagnostico.push(node.respostas[respostaEscolhida - 1].diagnostico)
    }

    if (node.respostas[respostaEscolhida - 1].hasOwnProperty('redireciona')) {
        let identificador = node.respostas[respostaEscolhida - 1].redireciona
        if (identificador === "fim") {
            return false
        }
        var otherNode = perguntas.find(item => item.identificador == identificador)
        return await processaNode(otherNode)
        // processaNode(node)
    }
}

async function iniciarPerguntas(perguntas) {

    resposta = await processaNode(perguntas[0])

    respostaInterface.close()
    if (diagnostico.length > 0) {
        console.log("Problemas identificados no computador:");
        for (let index = 0; index < diagnostico.length; index++) {
            console.log(diagnostico[index] + "\n");
        }
    } else {
        console.log("Nenhum problema foi identificado.");
    }

}

iniciarPerguntas(perguntas);