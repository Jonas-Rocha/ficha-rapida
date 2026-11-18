# Ficha Rápida do Corretor

## [Clique aqui para abrir o aplicativo](https://jonas-rocha.github.io/ficha-rapida/)

[![Abrir o aplicativo](https://img.shields.io/badge/ABRIR_O_APLICATIVO-e2582b?style=for-the-badge)](https://jonas-rocha.github.io/ficha-rapida/)

Funciona no computador e no celular, direto no navegador, sem instalar nada.

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
- Pré-proposta de compra (financiamento aprovado, ato, FGTS e parcelas de obra), com análise do perfil do cliente (renda, dívidas, restrição e score)
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
