async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);

  // 自动兼容 ethers v5 和 v6
  let formatEther;
  if (typeof ethers.utils !== "undefined" && ethers.utils.formatEther) {
    // ethers v5
    formatEther = ethers.utils.formatEther;
  } else if (typeof ethers.formatEther === "function") {
    // ethers v6
    formatEther = ethers.formatEther;
  } else {
    throw new Error("无法找到 formatEther 函数，请检查 ethers.js 版本");
  }

  console.log("Account balance:", formatEther(balance));

  // 替换为你的合约名称
  const Capsule = await ethers.getContractFactory("Capsule");
  const capsule = await Capsule.deploy();

  // 等待合约部署确认（不再需要 .deployed()）
  await capsule.waitForDeployment();

  // 获取合约地址（新版本语法）
  const address = await capsule.getAddress();
  console.log("Capsule deployed to:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });