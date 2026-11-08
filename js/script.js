let locatarios =
    JSON.parse(localStorage.getItem("locatarios")) || [];

let imoveis =
    JSON.parse(localStorage.getItem("imoveis")) || [];

let contratos =
    JSON.parse(localStorage.getItem("contratos")) || [];

let configuracoes =
    JSON.parse(localStorage.getItem("configuracoes")) || {};

let editandoLocatario = null;
let editandoImovel = null;


function salvarBanco(){

    localStorage.setItem(
        "locatarios",
        JSON.stringify(locatarios)
    );

    localStorage.setItem(
        "imoveis",
        JSON.stringify(imoveis)
    );

    localStorage.setItem(
        "contratos",
        JSON.stringify(contratos)
    );

    localStorage.setItem(
        "configuracoes",
        JSON.stringify(configuracoes)
    );

}



function $(id){

    return document.getElementById(id);

}


function existe(id){

    return document.getElementById(id) !== null;

}


function limparCampos(lista){

    lista.forEach(id=>{

        const campo = $(id);

        if(campo){

            campo.value="";

        }

    });

}



document.addEventListener("DOMContentLoaded", inicializarSistema);


function inicializarSistema(){

    if(typeof carregarDashboard==="function")
        carregarDashboard();

    if(typeof listarLocatarios==="function")
        listarLocatarios();

    if(typeof listarImoveis==="function")
        listarImoveis();

    if(typeof listarHistorico==="function")
        listarHistorico();

    if(typeof carregarSelectLocatarios==="function")
        carregarSelectLocatarios();

    if(typeof carregarSelectImoveis==="function")
        carregarSelectImoveis();

    if(typeof carregarConfiguracoes==="function")
        carregarConfiguracoes();

    if(typeof carregarContrato==="function")
        carregarContrato();

}


function salvarLocatario() {

    const nome = $("nome")?.value.trim();
    const estadoCivil = $("estadoCivil")?.value.trim();
    const nacionalidade = $("nacionalidade")?.value.trim();
    const profissao = $("profissao")?.value.trim();
    const rg = $("rg")?.value.trim();
    const orgao = $("orgao")?.value.trim();
    const cpf = $("cpf")?.value.trim();
    const cidade = $("cidade")?.value.trim();

    if (!nome) {
        alert("Informe o nome.");
        return;
    }

    if (!cpf) {
        alert("Informe o CPF.");
        return;
    }

    const existeCPF = locatarios.find(l => {

        if (editandoLocatario)
            return l.cpf === cpf && l.id !== editandoLocatario;

        return l.cpf === cpf;

    });

    if (existeCPF) {
        alert("Já existe um locatário com este CPF.");
        return;
    }

    if (editandoLocatario) {

        const index =
            locatarios.findIndex(l => l.id === editandoLocatario);

        locatarios[index] = {

            ...locatarios[index],

            nome,
            estadoCivil,
            nacionalidade,
            profissao,
            rg,
            orgao,
            cpf,
            cidade

        };

        editandoLocatario = null;

        alert("Locatário atualizado com sucesso!");

    } else {

        locatarios.push({

            id: Date.now(),

            nome,
            estadoCivil,
            nacionalidade,
            profissao,
            rg,
            orgao,
            cpf,
            cidade,

            criadoEm: new Date().toISOString()

        });

        alert("Locatário cadastrado com sucesso!");

    }

    salvarBanco();

    listarLocatarios();

    carregarSelectLocatarios();

    limparFormularioLocatario();

}


function limparFormularioLocatario() {

    limparCampos([
        "nome",
        "estadoCivil",
        "nacionalidade",
        "profissao",
        "rg",
        "orgao",
        "cpf",
        "cidade"
    ]);

}


function listarLocatarios() {

    const tabela = $("tabelaLocatarios");

    if (!tabela) return;

    tabela.innerHTML = "";

    if (locatarios.length === 0) {

        tabela.innerHTML = `
        <tr>
            <td colspan="4" style="text-align:center;">
                Nenhum locatário cadastrado.
            </td>
        </tr>
        `;

        return;

    }

    locatarios.forEach(locatario => {

        tabela.innerHTML += `

        <tr>

            <td>${locatario.nome}</td>

            <td>${locatario.cpf}</td>

            <td>${locatario.cidade}</td>

            <td>

                <button
                    class="btn-edit"
                    onclick="editarLocatario(${locatario.id})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="btn-delete"
                    onclick="excluirLocatario(${locatario.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}


function editarLocatario(id) {

    const locatario =
        locatarios.find(l => l.id === id);

    if (!locatario) return;

    $("nome").value = locatario.nome;
    $("estadoCivil").value = locatario.estadoCivil;
    $("nacionalidade").value = locatario.nacionalidade;
    $("profissao").value = locatario.profissao;
    $("rg").value = locatario.rg;
    $("orgao").value = locatario.orgao;
    $("cpf").value = locatario.cpf;
    $("cidade").value = locatario.cidade;

    editandoLocatario = id;

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


function excluirLocatario(id) {

    if (!confirm("Deseja excluir este locatário?"))
        return;

    locatarios =
        locatarios.filter(l => l.id !== id);

    salvarBanco();

    listarLocatarios();

    carregarSelectLocatarios();

}


// ======================================
// IMÓVEIS
// ======================================

function salvarImovel(){

    const numero = $("numeroApartamento")?.value.trim();

    const caracteristicas =
        $("caracteristicas")?.value.trim();

    const observacoes =
        $("observacoes")?.value.trim();

    if(!numero){

        alert("Informe o número do apartamento.");

        return;

    }

    const existe = imoveis.find(i=>{

        if(editandoImovel){

            return i.numero===numero &&
                   i.id!==editandoImovel;

        }

        return i.numero===numero;

    });

    if(existe){

        alert("Este apartamento já foi cadastrado.");

        return;

    }

    if(editandoImovel){

        const index =
            imoveis.findIndex(i=>i.id===editandoImovel);

        imoveis[index]={

            ...imoveis[index],

            numero,

            caracteristicas,

            observacoes

        };

        editandoImovel=null;

        alert("Imóvel atualizado.");

    }else{

        imoveis.push({

            id:Date.now(),

            numero,

            caracteristicas,

            observacoes

        });

        alert("Imóvel cadastrado.");

    }

    salvarBanco();

    listarImoveis();

    carregarSelectImoveis();

    limparFormularioImovel();

}



function limparFormularioImovel(){

    limparCampos([

        "numeroApartamento",

        "caracteristicas",

        "observacoes"

    ]);

}



function listarImoveis(){

    const tabela=$("tabelaImoveis");

    if(!tabela) return;

    tabela.innerHTML="";

    if(imoveis.length===0){

        tabela.innerHTML=`

        <tr>

            <td colspan="4">

                Nenhum imóvel cadastrado.

            </td>

        </tr>

        `;

        return;

    }

    imoveis
    .sort((a,b)=>Number(a.numero)-Number(b.numero))
    .forEach(imovel=>{

        tabela.innerHTML+=`

        <tr>

            <td>${imovel.numero}</td>

            <td>${imovel.caracteristicas}</td>

            <td>${imovel.observacoes || "-"}</td>

            <td>

                <button
                class="btn-edit"
                onclick="editarImovel(${imovel.id})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                class="btn-delete"
                onclick="excluirImovel(${imovel.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}



function editarImovel(id){

    const imovel =
        imoveis.find(i=>i.id===id);

    if(!imovel) return;

    $("numeroApartamento").value =
        imovel.numero;

    $("caracteristicas").value =
        imovel.caracteristicas;

    $("observacoes").value =
        imovel.observacoes;

    editandoImovel=id;

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}



function excluirImovel(id){

    if(!confirm("Deseja excluir este imóvel?"))
        return;

    imoveis =
        imoveis.filter(i=>i.id!==id);

    salvarBanco();

    listarImoveis();

    carregarSelectImoveis();

}



function carregarSelectImoveis(){

    const select = $("apartamento");

    if(!select) return;

    select.innerHTML=`

        <option value="">

            Selecione um apartamento

        </option>

    `;

    imoveis
    .sort((a,b)=>Number(a.numero)-Number(b.numero))
    .forEach(imovel=>{

        select.innerHTML+=`

            <option value="${imovel.id}">

                Apartamento ${imovel.numero}

            </option>

        `;

    });

}



function selecionarImovel(){

    const id =
        Number($("apartamento").value);

    if(!id){

        $("caracteristicas").value="";

        return;

    }

    const imovel =
        imoveis.find(i=>i.id===id);

    if(!imovel) return;

    $("caracteristicas").value =
        imovel.caracteristicas;

}

function gerarContrato(){

    const idLocatario =
        Number($("locatario").value);

    const idImovel =
        Number($("apartamento").value);

    const aluguel =
        Number($("valorAluguel").value);

    const meses =
        Number($("meses").value);

    const caucao =
        Number($("valorCaucao").value);

    const dataInicio =
        $("dataInicio").value;

    const cidadeAssinatura =
        $("cidadeAssinatura").value.trim();


    if(!idLocatario){

        alert("Selecione um locatário.");

        return;

    }

    if(!idImovel){

        alert("Selecione um imóvel.");

        return;

    }

    if(!aluguel){

        alert("Informe o valor do aluguel.");

        return;

    }

    if(!meses){

        alert("Informe o prazo.");

        return;

    }

    if(!caucao){

        alert("Informe o valor da caução.");

        return;

    }

    if(!dataInicio){

        alert("Informe a data de início.");

        return;

    }


    const locatario =
        locatarios.find(l=>l.id===idLocatario);

    const imovel =
        imoveis.find(i=>i.id===idImovel);

    if(!locatario){

        alert("Locatário não encontrado.");

        return;

    }

    if(!imovel){

        alert("Imóvel não encontrado.");

        return;

    }


    const contrato={

        id:Date.now(),

        numero:
           contratos.length
               ? Math.max(...contratos.map(c=>c.numero))+1
            :1,

        locatario,

        imovel,

        aluguel,

        meses,

        caucao,

        dataInicio,

        cidadeAssinatura,

        criadoEm:new Date().toISOString()

    };


    contratos.push(contrato);

    salvarBanco();

    abrirContrato(contrato.id);

}

function abrirContrato(id){

    window.location.href =
        `contrato.html?id=${id}`;

}

function visualizarContrato(id){

    abrirContrato(id);

}

function listarHistorico(){

    const tabela =
        $("tabelaHistorico");

    if(!tabela) return;

    tabela.innerHTML="";

    if(contratos.length===0){

        tabela.innerHTML=`

        <tr>

            <td colspan="6">

                Nenhum contrato cadastrado.

            </td>

        </tr>

        `;

        return;

    }

    contratos.forEach(c=>{

        tabela.innerHTML+=`

        <tr>

            <td>${String(c.numero).padStart(4,"0")}</td>

            <td>${c.locatario.nome}</td>

            <td>${c.imovel.numero}</td>

            <td>

                R$ ${c.aluguel.toFixed(2)}

            </td>

            <td>

                ${new Date(c.criadoEm)
                    .toLocaleDateString("pt-BR")}

            </td>

            <td>

                <button
                class="btn-edit"
                onclick="abrirContrato(${c.id})">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button
                class="btn-delete"
                onclick="excluirContrato(${c.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

function selecionarLocatario() {

    const id = Number($("locatario").value);

    if (!id) {

        $("estadoCivil").value = "";
        $("nacionalidade").value = "";
        $("profissao").value = "";
        $("rg").value = "";
        $("orgao").value = "";
        $("cpf").value = "";
        $("cidade").value = "";

        return;
    }

    const locatario = locatarios.find(l => l.id === id);

    if (!locatario) return;

    $("estadoCivil").value = locatario.estadoCivil;
    $("nacionalidade").value = locatario.nacionalidade;
    $("profissao").value = locatario.profissao;
    $("rg").value = locatario.rg;
    $("orgao").value = locatario.orgao;
    $("cpf").value = locatario.cpf;
    $("cidade").value = locatario.cidade;

}

function carregarSelectLocatarios() {

    const select = $("locatario");

    if (!select) return;

    select.innerHTML = `
        <option value="">Selecione um locatário</option>
    `;

    locatarios
        .sort((a, b) => a.nome.localeCompare(b.nome))
        .forEach(locatario => {

            select.innerHTML += `
                <option value="${locatario.id}">
                    ${locatario.nome}
                </option>
            `;

        });

}


function carregarContrato() {

    if (!existe("conteudoContrato")) return;

    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get("id"));

    if (!id) {

        $("conteudoContrato").innerHTML = `
            <h2>Contrato não encontrado.</h2>
        `;

        return;

    }

    const contrato = contratos.find(c => c.id === id);

    if (!contrato) {

        $("conteudoContrato").innerHTML = `
            <h2>Contrato não encontrado.</h2>
        `;

        return;

    }

    $("conteudoContrato").innerHTML = `

<div class="contrato">

    <div class="cabecalho">

        <h1>CONTRATO PARTICULAR DE LOCAÇÃO RESIDENCIAL</h1>

        <p><strong>Contrato nº ${String(contrato.numero).padStart(4,"0")}</strong></p>

    </div>

    <p>

        Pelo presente instrumento particular de locação residencial, de um lado,

        <strong>${configuracoes.nomeEmpresa || "Luis Alberto Santana Durão Junior"}</strong>,

        Solteiro, Brasileiro, Empresário, portador do RG: nº 0891109005, expedida por SSP/BA, inscrito(a) no CPF nº 828.260.725-87, residente e domiciliado na Rua Padre Luis Filgueiras n° 58 Engenho Velho de Brotas, Salvador-BA 40243-320, doravante denominado <strong>LOCADOR</strong>, e de outro lado

        <strong>${contrato.locatario.nome}</strong>,

        ${contrato.locatario.nacionalidade},

        ${contrato.locatario.estadoCivil},

        ${contrato.locatario.profissao},

        portador(a) do RG nº ${contrato.locatario.rg},

        inscrito(a) no CPF nº ${contrato.locatario.cpf},

        residente e domiciliado(a) em

        ${contrato.locatario.cidade}-BA,

        doravante denominado(a)

        <strong>LOCATÁRIO(A)</strong>,

        resolvem firmar o presente CONTRATO PARTICULAR DE LOCAÇÃO RESIDENCIAL,

        que será regido pelas cláusulas e condições abaixo.

    </p>

    <h3>CLÁUSULA PRIMEIRA – DO OBJETO DO CONTRATO</h3>

    <p>

        O LOCADOR dá em locação ao LOCATÁRIO o imóvel residencial

        identificado como

        <strong>Apartamento ${contrato.imovel.numero}</strong>,

        contendo as seguintes características:

        <strong>${contrato.imovel.caracteristicas}</strong>.

    </p>

    <p>

        O imóvel é entregue em perfeitas condições de uso,

        comprometendo-se o LOCATÁRIO a devolvê-lo,

        ao término da locação,

        nas mesmas condições em que o recebeu,

        ressalvado apenas o desgaste natural decorrente do uso normal.

    </p>

    <h3>CLÁUSULA SEGUNDA – DA DESTINAÇÃO DO IMÓVEL</h3>

    <p>

        O imóvel objeto deste contrato destina-se

        exclusivamente à moradia do LOCATÁRIO

        e de seus familiares,

        sendo vedada qualquer utilização para fins comerciais,

        industriais,

        profissionais,

        hospedagem remunerada

        ou qualquer outra finalidade diversa da residencial,

        salvo autorização expressa e por escrito do LOCADOR.

    </p>

    <h3>CLÁUSULA TERCEIRA – DA SUBLOCAÇÃO E CESSÃO</h3>

    <p>

        É expressamente proibida a sublocação,

        cessão,

        empréstimo,

        transferência ou qualquer forma de ocupação do imóvel

        por terceiros,

        total ou parcialmente,

        sem autorização prévia e por escrito do LOCADOR.

    </p>

    <p>

        O descumprimento desta cláusula constitui motivo suficiente

        para rescisão imediata deste contrato,

        sem prejuízo das penalidades legais e contratuais cabíveis.

    </p>

    <h3>CLÁUSULA QUARTA – DO ALUGUEL, ENCARGOS E TRIBUTOS</h3>
    

    <p>

        O LOCATÁRIO pagará ao LOCADOR,

        a título de aluguel mensal,

        o valor de

        <strong>

        R$ ${contrato.aluguel.toLocaleString("pt-BR",{
            minimumFractionDigits:2,
            maximumFractionDigits:2
        })}

        </strong>,

        vencendo-se mensalmente na data ajustada entre as partes.

    </p>

    <p>

        O atraso no pagamento implicará incidência de multa,

        juros legais,

        atualização monetária,

        bem como demais encargos previstos na legislação vigente,

        até a efetiva quitação do débito.

    </p>

    <p>

        São de responsabilidade exclusiva do LOCATÁRIO

        todas as despesas relativas ao consumo de água,

        energia elétrica,

        internet,

        gás,

        taxas de condomínio ordinárias,

        coleta de lixo,

        tributos incidentes sobre a utilização do imóvel

        e quaisquer outras despesas decorrentes da ocupação,

        salvo aquelas que,

        por força de lei,

        sejam de responsabilidade exclusiva do LOCADOR.

    </p>

        <h3>CLÁUSULA QUINTA – DO PRAZO DA LOCAÇÃO</h3>

    <p>

        O presente contrato terá duração de

        <strong>${contrato.meses} meses</strong>,

        iniciando-se em

        <strong>

        ${new Date(contrato.dataInicio).toLocaleDateString("pt-BR")}

        </strong>,

        encerrando-se automaticamente ao término do prazo,

        salvo manifestação expressa das partes em sentido contrário.

    </p>

    <p>

        Permanecendo o LOCATÁRIO no imóvel após o término do prazo,

        sem oposição do LOCADOR,

        a locação será prorrogada por prazo indeterminado,

        permanecendo válidas todas as demais cláusulas deste contrato,

        observando-se a legislação vigente.

    </p>



    <h3>CLÁUSULA SEXTA – DA GARANTIA (CAUÇÃO)</h3>

    <p>

        Como garantia do fiel cumprimento das obrigações assumidas,

        o LOCATÁRIO entrega ao LOCADOR,

        neste ato,

        a quantia de

        <strong>

        R$ ${contrato.caucao.toLocaleString("pt-BR",{
            minimumFractionDigits:2,
            maximumFractionDigits:2
        })}

        </strong>

        a título de caução em dinheiro.

    </p>

    <p>

        A caução será devolvida ao término da locação,

        desde que o imóvel seja restituído nas condições recebidas,

        inexistam débitos de aluguel,

        contas de consumo,

        multas,

        indenizações ou quaisquer outras obrigações pendentes.

    </p>

    <p>

        Caso existam débitos,

        o LOCADOR poderá utilizar,

        total ou parcialmente,

        o valor da caução para compensação,

        devolvendo eventual saldo remanescente ao LOCATÁRIO.

    </p>



    <h3>CLÁUSULA SÉTIMA – DOS DEVERES DO LOCADOR</h3>

    <p>

        Constituem deveres do LOCADOR:

    </p>

    <p>

        I - Entregar o imóvel em condições adequadas para moradia;

    </p>

    <p>

        II - Garantir ao LOCATÁRIO o uso pacífico do imóvel durante toda a locação;

    </p>

    <p>

        III - Responder pelos defeitos ou vícios anteriores à entrega do imóvel;

    </p>

    <p>

        IV - Fornecer recibos dos pagamentos efetuados sempre que solicitado;

    </p>

    <p>

        V - Responder pelas despesas que,

        por determinação legal,

        sejam de sua responsabilidade;

    </p>

    <p>

        VI - Restituir a caução ao término da locação,

        observadas as condições previstas neste contrato.

    </p>



    <h3>CLÁUSULA OITAVA – DOS DEVERES DO LOCATÁRIO</h3>

    <p>

        Constituem deveres do LOCATÁRIO:

    </p>

    <p>

        I - Efetuar o pagamento do aluguel e dos encargos nas datas ajustadas;

    </p>

    <p>

        II - Utilizar o imóvel exclusivamente para fins residenciais;

    </p>

    <p>

        III - Conservar o imóvel,

        mantendo-o em perfeito estado de limpeza,

        higiene,

        segurança e conservação;

    </p>

    <p>

        IV - Comunicar imediatamente ao LOCADOR qualquer defeito,

        infiltração,

        dano estrutural ou situação que exija reparo;

    </p>

    <p>

        V - Não realizar reformas,

        ampliações,

        modificações ou instalações permanentes sem autorização prévia e escrita do LOCADOR;

    </p>

    <p>

        VI - Permitir a vistoria do imóvel,

        mediante prévio agendamento,

        sempre que necessário;

    </p>

    <p>

        VII - Restituir o imóvel ao final da locação,

        livre de pessoas e bens,

        nas mesmas condições em que foi recebido,

        ressalvado o desgaste natural decorrente do uso normal.

    </p>

        <h3>CLÁUSULA NONA – DAS BENFEITORIAS</h3>

    <p>

        As benfeitorias necessárias realizadas para a conservação do imóvel deverão ser previamente comunicadas ao LOCADOR.

        As benfeitorias úteis ou voluptuárias somente poderão ser executadas mediante autorização expressa e por escrito.

    </p>

    <p>

        As benfeitorias realizadas sem autorização poderão permanecer incorporadas ao imóvel, sem que seja devida qualquer indenização ao LOCATÁRIO, salvo disposição legal em contrário.

    </p>


    <h3>CLÁUSULA DÉCIMA – DA RESCISÃO</h3>

    <p>

        O presente contrato poderá ser rescindido por qualquer das partes nas hipóteses previstas na Lei nº 8.245/91 (Lei do Inquilinato), bem como nas demais situações previstas neste instrumento.

    </p>

    <p>

        Havendo desocupação antecipada por iniciativa do LOCATÁRIO, este ficará sujeito ao pagamento da multa contratual proporcional ao período restante da locação, ressalvadas as hipóteses legais de isenção.

    </p>

    <p>

        O descumprimento de quaisquer obrigações assumidas neste contrato autoriza a parte prejudicada a considerá-lo rescindido, sem prejuízo da cobrança das perdas e danos eventualmente apurados.

    </p>


    <h3>CLÁUSULA DÉCIMA PRIMEIRA – DAS PENALIDADES</h3>

    <p>

        O inadimplemento de qualquer obrigação prevista neste contrato sujeitará a parte infratora às penalidades previstas na legislação vigente, sem prejuízo da obrigação de indenizar eventuais prejuízos materiais e morais causados à outra parte.

    </p>

    <p>

        A eventual tolerância quanto ao descumprimento de qualquer cláusula não importará em renúncia de direito, novação contratual ou alteração das condições aqui estabelecidas.

    </p>


    <h3>CLÁUSULA DÉCIMA SEGUNDA – DO FORO</h3>

    <p>

        As partes elegem o foro da comarca onde está localizado o imóvel para dirimir quaisquer dúvidas ou controvérsias oriundas deste contrato, renunciando a qualquer outro, por mais privilegiado que seja.

    </p>


    <br><br>

    <p style="text-align:right">

        ${contrato.cidadeAssinatura},

        ${new Date().toLocaleDateString("pt-BR")}

    </p>

    <br><br><br>


    <div class="assinaturas">

    <div class="assinatura">
        <div class="linha-assinatura"></div>
        <span>___________________________________________________</span>
        <br>
        <strong>${configuracoes.nomeEmpresa || "Luis Alberto Santana Durão Junior"}</strong>
        <br>
        <span>LOCADOR</span>
        <br><br><br><br>
    </div>

    <div class="assinatura">
        <div class="linha-assinatura"></div>

        <span>___________________________________________________</span>
        <br>
        <strong>${contrato.locatario.nome}</strong>
        <br>
        <span>LOCATÁRIO(A)</span>
    </div>

    <br><br><br><br>

    <div class="assinatura">
        <div class="linha-assinatura"></div>
        <strong>TESTEMUNHA 1</strong>
        <span>Nome: _________________________________</span>
        <span>CPF: __________________________________</span>
    </div>
    <br><br>

    <div class="assinatura">
        <div class="linha-assinatura"></div>
        <strong>TESTEMUNHA 2</strong>
        <span>Nome: _________________________________</span>
        <span>CPF: __________________________________</span>
    </div>

</div>

`;

}


function carregarDashboard() {

    if (!existe("totalLocatarios")) return;

    $("totalLocatarios").textContent = locatarios.length;

    $("totalImoveis").textContent = imoveis.length;

    $("totalContratos").textContent = contratos.length;

    const valorTotal = contratos.reduce((total, contrato) => {

        return total + Number(contrato.aluguel || 0);

    }, 0);

    $("valorAlugueis").textContent =
        valorTotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

}

function excluirContrato(id){

    if(!confirm("Deseja excluir este contrato?"))
        return;

    contratos = contratos.filter(c => c.id !== id);

    salvarBanco();

    listarHistorico();

    carregarDashboard();

}


function salvarConfiguracoes() {

    if (!existe("nomeEmpresa")) return;

    configuracoes = {

        nomeEmpresa: $("nomeEmpresa").value.trim(),

        cnpj: $("cnpj").value.trim(),

        telefone: $("telefone").value.trim(),

        endereco: $("endereco").value.trim(),

        cidade: $("cidadeEmpresa").value.trim(),

        email: $("emailEmpresa").value.trim()

    };

    salvarBanco();

    alert("Configurações salvas com sucesso!");

}

function carregarConfiguracoes() {

    if (!existe("nomeEmpresa")) return;

    $("nomeEmpresa").value = configuracoes.nomeEmpresa || "";
    $("cnpj").value = configuracoes.cnpj || "";
    $("telefone").value = configuracoes.telefone || "";
    $("endereco").value = configuracoes.endereco || "";
    $("cidadeEmpresa").value = configuracoes.cidade || "";
    $("emailEmpresa").value = configuracoes.email || "";

}


function exportarBackup() {

    const dados = {

        locatarios,

        imoveis,

        contratos,

        configuracoes

    };

    const json =
        JSON.stringify(dados, null, 4);

    const blob =
        new Blob(
            [json],
            { type: "application/json" }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    const data =
        new Date().toISOString().split("T")[0];

    link.href = url;

    link.download =
        `backup-contratos-durao-${data}.json`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}



function importarBackup(event) {

    if (!confirm(
        "Todos os dados atuais serão substituídos. Deseja continuar?"
    )) {

        event.target.value = "";
        return;
    }

    const arquivo = event.target.files[0];

    if (!arquivo)
        return;

    const leitor =
        new FileReader();

    leitor.onload = function(e) {

        try {

            const dados =
                JSON.parse(e.target.result);

            locatarios =
                dados.locatarios || [];

            imoveis =
                dados.imoveis || [];

            contratos =
                dados.contratos || [];

            configuracoes =
                dados.configuracoes || {};

            salvarBanco();

            alert(
                "Backup restaurado com sucesso!"
            );

            carregarDashboard();

            listarLocatarios();

            listarImoveis();

            listarHistorico();

            carregarSelectLocatarios();

            carregarSelectImoveis();

            carregarConfiguracoes();

alert("Backup restaurado com sucesso!");

        } catch {

            alert(
                "Arquivo de backup inválido."
            );

        }

    };

    leitor.readAsText(arquivo);

}

function pesquisarContrato(){

    const texto =
        $("pesquisaContrato")
            .value
            .toLowerCase();

    const tabela =
        $("tabelaHistorico");

    if(!tabela) return;

    tabela.querySelectorAll("tr").forEach(linha=>{

        linha.style.display =
            linha.innerText
            .toLowerCase()
            .includes(texto)
            ? ""
            : "none";

    });

}


function toggleMenu() {

    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".overlay");

    sidebar.classList.toggle("active");

    if (overlay) {
        overlay.classList.toggle("active");
    }

}

function fecharMenu() {

    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".overlay");

    sidebar.classList.remove("active");

    if (overlay) {
        overlay.classList.remove("active");
    }

}