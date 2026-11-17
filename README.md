# Ficha Rápida do Corretor

Aplicativo web simples para corretores de imóveis cadastrarem clientes, controlarem os documentos entregues e montarem propostas prontas para enviar pelo WhatsApp.

Projeto de extensão da disciplina Atividades de Extensão (Cultura e Desenvolvimento Social), curso de Análise e Desenvolvimento de Sistemas.

## Tecnologias

- React 18
- TypeScript
- Tailwind CSS
- Vite

## Por que não tem backend

A ideia foi deixar o app o mais simples possível para os corretores não precisarem pagar hospedagem nem servidor. Os dados ficam salvos no próprio navegador (localStorage), então cada aparelho guarda os seus cadastros.

## Funcionalidades

- Cadastro e edição de clientes
- Busca por nome ou telefone
- Checklist de documentos com barra de progresso
- Montagem de proposta (valor, entrada, parcelas e saldo a financiar)
- Envio da proposta e contato direto pelo WhatsApp
- Layout com letras grandes, pensado para quem tem pouca familiaridade com tecnologia

## Como rodar

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos ficam na pasta `dist`, que pode ser publicada em qualquer hospedagem estática gratuita (GitHub Pages, Netlify, Vercel).

## Estrutura

```
src/
  components/   telas e partes da interface
  hooks/        estado dos clientes e avisos
  utils/        formatação, proposta e link do WhatsApp
  data/         fichas de exemplo
  types.ts
  constants.ts
```
