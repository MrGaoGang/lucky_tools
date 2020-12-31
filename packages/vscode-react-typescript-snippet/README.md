# vscode-react-typescript-snippet


## 下载

打开`vscode插件`并搜索`React code snippets Typescript`即可。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a964dd70029467381e38f20f05f315b~tplv-k3u1fbpfcp-zoom-1.image)

## 支持文件

- TypeScript (.ts)
- TypeScript React (.tsx)

## 代码片段

|       Trigger | Content                                      |
| ------------: | -------------------------------------------- |
|      `tslrcc→` | `react 类式组件`                             |
|   `tslrcstate` | `包含Props, State, 和 constructor的类式组件` |
|     `tslrpcc→` | `react PureComponent组件`                    |
|      `tslrpfc` | `react 函数式组件`                           |
|     `tsldrpfc` | `拥有default export的函数式react组件`        |
|       `tslrfc` | `无状态的函数式react组件`             |
|       `tslconc→` | `react constructor 方法`                      |
|        `tslcwm→` | `componentWillMount 方法`                    |
|        `tslren→` | `render 方法`                                |
|        `tslcdm→` | `componentDidMount 方法`                     |
|       `tslcwrp→` | `componentWillReceiveProps 方法`             |
|        `tslscu→` | `shouldComponentUpdate 方法`                 |
|        `tslcwu→` | `componentWillUpdate 方法`                   |
|        `tslcdu→` | `componentDidUpdate 方法`                    |
|       `tslcwum→` | `componentWillUnmount 方法`                  |
|        `tslsst→` | `this.setState生成`                          |
|        `tslbnd→` | `绑定语句`                                   |
|        `tslmet→` | `创建一个方法`                               |
|   `tslcredux→` | `创建一个类式的redux，包含connect`           |
| `tslrfredux->` | `创建一个函数式的redux，包含connect`         |
|         `imt` | `生成一个import语句`                         |

### state 相关

**tslrcstate**

```js
import * as React from "react";

export interface IAppProps {}

export interface IAppState {}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div></div>;
  }
}
```

### functional 相关

**tslrfc**

```js
import * as React from "react";

interface IAppProps {}

const App: React.FC<IAppProps> = (props) => {
  return <div></div>;
};

export default App;
```

### redux 相关

**tslrcredux**

```js
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
// you can define global interface ConnectState in @/state/connect.d
import { ConnectState } from "@/state/connect.d";

export interface IAppProps {}

export type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IAppProps;

class App extends React.Component<ReduxType> {
  public render() {
    return <div></div>;
  }
}

const mapStateToProps = (state: ConnectState) => {
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

**tslrfredux**

```js
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
// you can define global interface ConnectState in @/state/connect.d
import { ConnectState } from "@/state/connect.d";

export interface IAppProps {}

export type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IAppProps;

const App: React.FC<ReduxType> = (props) => {
  return <div></div>;
};

const mapStateToProps = (state: ConnectState) => {
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

**tslrpfc**

```js
import * as React from "react";

export interface IAppProps {}

export function App(props: IAppProps) {
  return <div></div>;
}
```
