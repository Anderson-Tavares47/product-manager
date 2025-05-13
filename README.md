# 💻 Product Manager - Teste Frontend

Este é um projeto desenvolvido como solução para um teste técnico de Frontend. A aplicação consiste em um sistema de gerenciamento de produtos com funcionalidades como listagem, adição, filtros e ordenação.

## 🔧 Tecnologias utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Context API](https://reactjs.org/docs/context.html)

## ✅ Funcionalidades implementadas

- ✅ **Listagem de produtos** com:
  - Nome
  - Categoria
  - Preço
  - Descrição
  - Imagem

- ✅ **Adição de produto** com formulário:
  - Nome
  - Categoria
  - Preço (com formatação monetária ao digitar)
  - Descrição
  - Imagem (seleção de imagens locais ou por URL)

- ✅ **Filtro por nome**
- ✅ **Filtro por faixa de preço**
- ✅ **Ordenação por nome e preço**
- ✅ **Paginação responsiva**
- ✅ **Layout totalmente responsivo**
- ✅ **Componentização com reuso de lógica e estilo**
- ✅ **Visualização de imagem antes da submissão**

## 🧠 Lógicas extras e boas práticas

- Uso de `Context API` para gerenciamento de estado global dos produtos.
- Reaproveitamento de função `formatCurrency` para garantir consistência entre formulário e filtros.
- Validação de imagem por URL com pré-visualização automática.
- Responsividade com Tailwind e grid adaptável.
- Separação de componentes por responsabilidade: `ProductCard`, `ProductFilters`, `ProductForm`, `CustomSelect`.

## 📸 Demonstração

![Demonstração do layout da aplicação](./product-manager/src/assets/img/demo-screenshot.png)

## 🧪 Testes

> *Teste automatizado não implementado conforme combinado no escopo.*

## ▶️ Como rodar o projeto

1. Clone este repositório:

```bash
git clone https://github.com/Anderson-Tavares47/product-manager
