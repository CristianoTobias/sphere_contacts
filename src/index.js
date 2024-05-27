import React from "react"; // Importa a biblioteca React
import { createRoot } from "react-dom/client"; // Importa a função createRoot do pacote react-dom/client, usada para renderizar a aplicação
import { Provider } from "react-redux"; // Componente Provider usado para disponibilizar o store Redux para todos os componentes
import { store } from "./app/store"; // Importa a store Redux da aplicação
import App from "./App"; // Importa o componente principal da aplicação

const container = document.getElementById("root"); // Seleciona o elemento HTML com o id "root" onde a aplicação será renderizada
const root = createRoot(container); // Cria uma raiz de renderização na DOM usando o elemento selecionado
root.render( // Renderiza a aplicação na raiz criada
  <React.StrictMode> {/* Componente React.StrictMode usado para ativar verificações adicionais e avisos durante a renderização, útil para encontrar problemas potenciais */}
    <Provider store={store}> {/* Componente Provider usado para disponibilizar a store Redux para a aplicação */}
      <App /> {/* Componente principal da aplicação */}
    </Provider>
  </React.StrictMode> // Fim do modo estrito de renderização
);
