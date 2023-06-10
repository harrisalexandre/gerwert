confirm("Are you sure you want to delete?")
$(document).ready(function () {

    $(".mudaTela").click(function () {
        mudaTela($(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao"));
    });

    $("a.opcoes").click(function (e) {
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    $(".calendario .marcado").click(function () {
        mostraMsgMes($(this).attr("value"));
    });

    const mudaTela = (atual, nova = null, animacao = "fade", tempoAnimacao = 900) => {

        // define a nova tela
        if (!nova) {
            nova = parseInt(atual.parent().attr("id").split("tela")[1]) + 1;
        }

        if (animacao == "fade") {
            $("#tela" + (nova - 1)).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#tela" + nova).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        } else {
            $("#tela" + (nova - 1)).hide(tempoAnimacao);
            $("#tela" + nova).show(tempoAnimacao);
        }

        if ($("#tela" + nova).hasClass("temporizado")) {
            $("#tela" + nova + " div").hide();
            telaTemporizada(nova, 0);
        }

        verificaFundo(nova);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if (nova == 5) {
            var audio = new Audio('assets/musica.mp3');
            audio.volume = 0.1;
            audio.play();
        }

    }

    const telaTemporizada = (nTela, contador) => {

        const tela = $("#tela" + nTela + " div:eq(" + contador + ")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador == 0 ? $("#tela" + nTela).attr("tempo") : temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if (tela.attr("final") == "true") {
                    mudaTela(null, nTela + 1, "fade", 900);
                    verificaFundo(nTela + 1);
                } else {
                    telaTemporizada(nTela, contador + 1);
                }

            }, tela.attr("tempo"));

        }, temporizadorPrimeiraTela);

    }

    const verificaFundo = (nTela) => {

        const fundo = $("#tela" + nTela).attr("fundo");
        const tempo = $("#tela" + nTela).attr("tempo");

        if (fundo) {
            $("body").attr("class", fundo);
        }

    }

    const mostraMsgMes = (texto) => {

        let titulo;
        let mensagem;

        switch (texto) {
            case "1/4": titulo = "01 de Abril de 2023"; mensagem = "<p>Esse foi o dia que nos conhecemos! Ou pelo menos, o dia que nos conhecemos já sabendo que dali pra frente poderiamos ter alguma coisa juntos.</p><p>Foi bem rápido e conversamos tão pouquinho, mas já foi o suficiente para eu entender naquele momento que você era diferente, e que todo o tempo que eu dedicava em escrever minhas mensanges pra você, estavam valendo a pena. Eu quis de verdade, a partir desse dia, te conhecer melhor do que já conhecia por mensagens.</p><p>E eu estava certo, você é incrível! Te amo! ❤️</p>"; break;
            case "5/4": titulo = "05 de Abril de 2023"; mensagem = "<p>Foi o dia que decidimos deixar o outro aplicativo de lado e trocamos as primeiras mensagens pelo Whatsapp. Quase viramos a noite conversando nesse dia. Te amo! ❤️</p>"; break;
            case "19/4": titulo = "19 de Abril de 2023"; mensagem = "<p>O dia que nos conhecemos presencialmente</p><p>Foi tão incrível, lembro como não conseguia formar uma frase. Fiquei sem voz e quando falava gaguejava. Estar tão perto de ti, ver que você é real. Que a mulher que sempre sonhei existe! Te amo! ❤️</p>"; break;
            case "28/4": titulo = "28 de Abril de 2023"; mensagem = "<p>Foi o primeiro dia que saímos.<br>Você estava linda, usando sua blusa de bolinhas brancas.</p><p>Era seu primeiro show, e eu estava tão nervoso.</p><p>Mas logo esse nervosismo foi embora abrindo espaço pra um dos dias mais mágicos que já vivemos juntos. Te amo! ❤️</p>"; break;

            case "19/5": titulo = "19 de Maio de 2023"; mensagem = "<p>Foi a primeira vez que fui te visitar.<br>ainda me lembro como perdi no caminho. hahahah.</p><p>Foi tão gostoso, a nenê se comportou até, gostamos muito da casa da Carol, de ir no Zagaia.</p><p>Poder conhecer seus amigos e seu lab, lugares que muito enchiam meus olhos ao te ver falar e poder partilhar disso, estar junto com você. Te amo! ❤️</p>"; break;

            case "2/6": titulo = "2 de Junho de 2023"; mensagem = "<p>Como um açaí virou uma aliança?.</p><p>Pois então hahah.</p>Saímos pra aproveitar o sol, estava um dia lindo e quente, fomos num açaí que tem aqui e foi bem legal, foi tudo tão legal.<p>Nesse dia pude perceber quanto evoluimos como casal, como namorados e após olhar algumas vitrines... Por que não uma aliança? Ainda me lembro como travei, porque não achei que fosse querer e como mais uma vez tu ama me surpreender, me supreendeu de novo, escolhemos juntos, foi tudo tão lindo, parar no banco da praçinha ver teu olho brilhando e no seu dedo e no meu dedo um laço do nosso enlace. Te amo! ❤️</p>"; break;
            case "4/6": titulo = "4 de Junho de 2023"; mensagem = "<p>Nosso primeiro aniversário de Namoro!</p>Meus Deus que dia incrível!<p>Almoçamos uma lasanha de coração, algo que nunca tinha comido e mais cedo tinha ido ao mercado com o Kevyn, te trouxe um chocolatinho. (conta pra mim, esperava a surpresinha? haha) mais tarde comemos esse choco acompanhado de um vinho, ouvindo música. Foi um papo tão legal e descontraído, gradualmente percebermos nossa evolução, na forma de nos compreender e que nos esforçamos pra isso, respeitar o espaço do outro e compreender mais o jeito e a história. Pra mim essa noite foi muito singular pois me senti muito acolhido, podendo ser eu mesmo. Te amo! ❤️</p>"; break;


        }

        mostraPopUp(true, titulo, mensagem);
        telaFinal = (texto == "final" ? true : false);
    }



});

let telaFinal = false;

const mostraPopUp = (mostrar, titulo = "Título de testes", mensagem = "Mensagem de teste...") => {

    if (mostrar) {
        $("html, body").animate({ scrollTop: $(".pop-up")[0].offsetTop }, "smooth");
        $(".pop-up").fadeIn(500);
        $(".pop-up h1").html(titulo);
        $(".pop-up div").html(mensagem);
        $(".container").css("opacity", "0.5");
    } else {
        $(".pop-up").fadeOut(500);
        $(".container").css("opacity", "1");

        if (telaFinal) {
            $("#tela19").fadeOut(4000);
            setTimeout(() => {
                $("#tela20").fadeIn(6500);
                $("body").attr("class", "fundo6");
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 4000);
        }

    }

}