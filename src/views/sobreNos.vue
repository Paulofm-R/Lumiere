<template>
    <div id="sobreNosDiv">
        <h1>SOBRE NÓS</h1>
        <br>
        <h2>Como surgiu a Lumière?</h2>
        <p>No âmbito de Projeto II, unidade curricular da licenciatura de TSIW, foi proposto criar um site que te fosse trazer um ambiente para amantes do cinema. Assim, criamos a Lumière para que qualquer cinéfilo, como tu, poder conhecer novos filmes/séries, avaliar os mesmos e mostrar os teus conhecimentos nos jogos, enquanto ganhas medalhas e a possibilidadde de estar nos tops das tabelas de classificação.</p>
        <br>
        <h2>Porque Lumière?</h2>
        <p>Em homenagem aos pais do cinema, Auguste e Louis Lumière, decidimos nomear o site pois estes marcam o inicio deste teu grande gosto.</p>
        <br>
        <h2>Mas, afinal, o que posso fazer aqui?</h2>
        <p>Aqui podes encontrar novos filmes e séries, podes encontrar os teus filmes e séries favoritos e dizer o que achas aos outros utilizadores, ou então, joga e mostra os teus conhecimentos enquanto te divertes neste ambiente para amantes desta arte.</p>
        <br>
        <p id="txtFinal">Assim, esperamos que te divirtas neste espaço criado pensado em ti, pequeno cinéfilo, e que este ambiente te enalteça o que sentes pelo cinema. Diverte-te,</p>
        <br>
        <p id="assinatura">Paulo, Sofia & Inês</p>
        
    </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>
    h1{
        text-align: center;
        font-family: var(--font2);
        padding-bottom: 5%;
    }

    h2{
       text-align: left;
       font-family: var(--font2);
       padding-left: 5%; 
    }

    p{
        text-align: left;
        font-family: var(--font1);
        font-size: 24px;
        margin-left: 7%;
        margin-top: 2%;
    }

    #txtFinal{
        text-align: left;
        font-family: var(--font1);
        font-size: 28px;
    }

    #assinatura{
        text-align: right;
        font-family: var(--font3);
        font-size: 40px;
    }
</style>