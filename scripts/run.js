const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  const ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log(
    `${owner.address} has a balance of: `,
    hre.ethers.utils.formatEther(ownerBalance)
  );
  console.log("Contract deployed to:", waveContract.address);

  // get contract balance
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave("hello from person 1");
  await waveTxn.wait();
  // testing the anti-spam
  let waveTxn1 = await waveContract.wave("hello from person 1");
  await waveTxn1.wait();

  waveCount = await waveContract.getTotalWaves();

  waveTxn = await waveContract
    .connect(randomPerson)
    .wave("hello from person 2");
  await waveTxn.wait();

  console.log("all waves:", await waveContract.getAllWaves());

  newContractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "New Contract balance:",
    hre.ethers.utils.formatEther(newContractBalance)
  );

  waveCount = await waveContract.getTotalWaves();
};

const runMain = async () => {
  try {
    await main();
    // exit Node process without error
    process.exit(0);
  } catch (error) {
    console.log(error);
    // exit Node process while indicating 'Uncaught Fatal Exception' error
    process.exit(1);
  }
};

runMain();
