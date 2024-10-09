let perguntas = [
    {
        identificador: "verificar-pc-liga",
        pergunta: "O computador liga ou dá algum sinal que está ligado?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "liga-ou-da-tela-azul"
            },
            {
                respostaPossivel: "Não",
                redireciona: "testando-fonte-separada"
            },
            {
                respostaPossivel: "Não sabe/ Não tem certeza",
                redireciona: "sabe-ligar-pc"
            },
        ],
    },
    {
        identificador: "sabe-ligar-pc",
        pergunta: "Você sabe ligar o computador?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "verificar-pc-liga"
            },
            {
                respostaPossivel: "Não",
                resposta: "Precisa ser uma pessoa com mais conhecimento para realizar o teste"
            },
        ],
    },
    {
        identificador: "testando-fonte-separada",
        pergunta: "Apos testar a fonte separadamente, ela apresentou algum problema?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "testar-botao-power",
                diagnostico: "Fonte"
            },
            {
                respostaPossivel: "Não",
                resposta: "testar-botao-power"
            },
            {
                respostaPossivel: "Não sabe/ Não tem certeza",
                redireciona: "sabe-testar-fonte"
            },

        ],
    },
    {
        identificador: "sabe-testar-fonte",
        pergunta: "Você sabe testar uma fonte?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "testando-fonte-separada"
            },
            {
                respostaPossivel: "Não",
                resposta: "Precisa ser uma pessoa com mais conhecimento pararealizar o teste"
            },
        ]
    },
    {
        identificador: "testar-botao-power",
        pergunta: "Apos testar o botão power separado você identificou algum problema?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "testa-cabo-alimentacao",
                diagnostico: "Botao Power"
            },
            {
                respostaPossivel: "Não",
                redireciona: "testa-cabo-alimentacao",
            },
            {
                respostaPossivel: "Não sabe/ Não tem certeza",
                redireciona: "sabe-testar-botao-power"
            },
        ]
    },
    {
        identificador: "sabe-testar-botao-power",
        pergunta: "Você sabe testar o botão de power do gabinete?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "testar-botao-power",
            },
            {
                respostaPossivel: "Não",
                resposta: "Precisa ser uma pessoa com mais conhecimento para realizar o teste",
            },
        ]
    }, {
        identificador: "testa-cabo-alimentacao",
        pergunta: "Você testou o cabo de alimentação e apresentou algum problema?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "verificar-pc-liga",
                diagnostico: "Cabo alimentacao"
            },
            {
                respostaPossivel: "Não",
                redireciona: "verificar-pc-liga"
            },
            {
                respostaPossivel: "Não sei",
                redireciona: "sabe-testar-cabo-alimentacao"
            },
        ]
    },
    {
        identificador: "sabe-testar-cabo-alimentacao",
        pergunta: "Você sabe testar o cabo de alimentação?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "testa-cabo-alimentacao"
            },
            {
                respostaPossivel: "Não",
                resposta: "Precisa ser uma pessoa com mais conhecimento para realizar o teste"
            },
        ]
    },
    {
        identificador: "liga-ou-da-tela-azul",
        pergunta: "Ele liga normalmente e dá tela azul ou reinicia?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "testou-memoria",
            },
            {
                respostaPossivel: "Não",
                redireciona: "testar-sinal-video"
            }
        ]
    },
    {
        identificador: "testar-sinal-video",
        pergunta: "Ele dá Sinal de vida mas não dá sinal de video?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "testou-placa-mae",
            },
            {
                respostaPossivel: "Não",
                redireciona: "liga-ou-da-tela-azul"
            },
            {
                respostaPossivel: "Não sei",
                redireciona: "sabe-ligar-pc"
            }
        ]
    },
    {
        identificador: "testou-placa-mae",
        pergunta: "Você testou a placa mãe separadamente e ela apresentou algum defeito?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "testou-placa-video",
                diagnostico: "Placa mãe"
            },
            {
                respostaPossivel: "Não",
                redireciona: "testou-placa-video"
            },
            {
                respostaPossivel: "Não sei",
                resposta: "Precisa ser uma pessoa com mais conhecimento para realizar o teste"
            }
        ]
    },
    {
        identificador: "testou-placa-video",
        pergunta: "Você testou a placa de video separadamente e ela apresentou algum problema?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "testou-processador-sinal-video",
                diagnostico: "Placa de video"
            },
            {
                respostaPossivel: "Não",
                redireciona: "testou-processador-sinal-video"
            },
            {
                respostaPossivel: "Não sei",
                resposta: "Precisa ser uma pessoa com mais conhecimento para realizar o teste"
            }
        ]
    },
    {
        identificador: "testou-processador-sinal-video",
        pergunta: "Verificou o processador separadamente e ele apresentou algum problema?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "verificou-cabo-video",
                diagnostico: "Processador"
            },
            {
                respostaPossivel: "Não",
                redireciona: "verificou-cabo-video"
            },
            {
                respostaPossivel: "Não sei",
                resposta: "Precisa ser uma pessoa com mais conhecimento para realizar o teste"
            }
        ]
    },
    {
        identificador: "verificou-cabo-video",
        pergunta: "Verificou cabo hdmi ou flat separadamente e ele apresentou algum problema?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "liga-ou-da-tela-azul",
                diagnostico: "Cabo de video"
            },
            {
                respostaPossivel: "Não",
                redireciona: "liga-ou-da-tela-azul"
            },
            {
                respostaPossivel: "Não sei",
                resposta: "Precisa ser uma pessoa com mais conhecimento para realizar o teste"
            }
        ]
    },
    {
        identificador: "testou-memoria",
        pergunta: "Você testou a memoria separadamente e ela apresentou algum defeito?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "testou-processador",
                diagnostico: "Memoria"
            },
            {
                respostaPossivel: "Não",
                redireciona: "testou-processador"
            },
            {
                respostaPossivel: "Não sei",
                resposta: "Precisa ser uma pessoa com mais conhecimento para realizar o teste"
            }
        ]
    },
    {
        identificador: "testou-processador",
        pergunta: "Você testou o processador separadamente e ele apresentou algum defeito?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "testou-cabos",
                diagnostico: "Processador"
            },
            {
                respostaPossivel: "Não",
                redireciona: "testou-cabos"
            },
            {
                respostaPossivel: "Não sei",
                resposta: "Precisa ser uma pessoa com mais conhecimento para realizar o teste"
            }
        ]
    },
    {
        identificador: "testou-cabos",
        pergunta: "Você testou os cabos separadamente e eles apresentaram algum defeito?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "testou-armazenamento",
                diagnostico: "Cabos"
            },
            {
                respostaPossivel: "Não",
                redireciona: "testou-armazenamento"
            },
            {
                respostaPossivel: "Não sei",
                resposta: "Precisa ser uma pessoa com mais conhecimento para realizar o teste"
            }
        ]
    },
    {
        identificador: "testou-armazenamento",
        pergunta: "Você testou as unidades de armazenamento separadamente e elas apresentaram algum problema?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "fim",
                diagnostico: "Unidade de armazenamento"
            },
            {
                respostaPossivel: "Não",
                redireciona: "fim"
            },
            {
                respostaPossivel: "Não sei",
                resposta: "Precisa ser uma pessoa com mais conhecimento para realizar o teste"
            }
        ]
    },
]

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



    // if (typeof nodo === 'string') {
    //     console.log("A resposta é " + nodo)
    //     return true
    // } else if (typeof nodo === 'object' && nodo.pergunta) {
    //     let resposta = await fazPergunta(nodo.pergunta + " (Digite 1 para SIM ou 2 para NÃO \n)")

    //     if (resposta == 1 && nodo.subElemento && nodo.subElemento.sim) {
    //         return await processaNodo(nodo.subElemento.sim)
    //     } else if (resposta == 2 && nodo.subElemento && nodo.subElemento.nao) {
    //         return await processaNodo(nodo.subElemento.nao)
    //     } else {
    //         return false //nenhuma resposta encontrada
    //     }
    // }
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