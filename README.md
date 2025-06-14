# 这里是胶囊仓付款及评价页面
 预设场景是，用户或经过之前同学制作的预，或是随机消费来到胶囊仓前，通过nfc或二维码进入此网页，完成付款进入舱室完成卫生评价，是一个基于区块链开发的dapp，通过经济学奖励实现卫生自治。

 具体到视频场景，当account2的用户付款进入，扣除1VETH，评分；我们切换metamask钱包账户到account3,模拟另外一个用户之后进入，此时ta付款，账户扣除1VETH，由于账户2的用户带走自己的垃圾并保持清洁，用户3给与了>=4星的评价，由合约账户向用户2账户打款作为奖励激励

 这基于区块链的基本假设：利益无关场景下，，大部分人是客观不作恶的，而奖励的比例可以浮动，这种互动方式也会鼓励大家参与，正如现实中很小数额的金钱吸引力不大，而大家却愿意去抢微信红包，我们不仅可以“粗暴”地给出折扣，也可以通过发放NFT奖品，卫生勋章这种链上虚拟资产鼓励大家，正如区块链pet shop应用CryptoKitties的火爆证明的，这种有趣的体验也可以鼓励大家随手维护卫生，实现我们的自治目标


智能合约代码路径：contracts/Capsule.sol

react部分：frontend/src/App.js

Try running some of the following tasks:

```shell
nvm alias default 22.14.0
npm install
npx hardhat compile
cp artifacts/contracts/Capsule.sol/Capsule.json frontend/src/contracts/
npx hardhat console --network localhost
npm start
```
