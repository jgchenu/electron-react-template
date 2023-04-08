import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

import { store } from "$src/redux/store";
import Routes from "$src/routes";
import { mainWindowName } from "$shared/constants";

import "normalize.css";
import "antd/dist/reset.css";

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#5263e7" } }}>
      <Provider store={store}>
        <BrowserRouter basename={mainWindowName}>
          <Routes />
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
