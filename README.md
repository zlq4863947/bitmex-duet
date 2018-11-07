# bitmex-duet
bitmex-一目均线机器人


## 配置
1、config/default.org.toml 改为 config/default.toml

## 启动步骤
启动程序步骤

```js
// 只在第一次安装程序时需要运行
npm install
// 启动自动返佣主程序
npm start
```

## 返佣程序配置说明

以下三个参数 为必须项

  交易商品
  symbol = "XBTUSD"
  
  交易数量
  amount = 50
  
  交易方向 Buy/Sell
  side = "Buy"


## 疑难解答

Q：toml配置如何改为json配置?

A：可以把toml后缀改成json,然后通过[这个地址](https://toml-to-json.matiaskorhonen.fi/)，把toml格式配置转换成json格式。