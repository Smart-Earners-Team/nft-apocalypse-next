import { ethers } from "ethers";
import factoryABI from "../utils/NFTxNFTPoolFactoryABI.json"; //NFTxNftPoolABI.json
import poolAbi from "../utils/NFTxNftPoolABI.json"; //
import { FACTORY_CONTRACT } from "../utils/contracts";

async function useGetPools(rpc: string) {
  let poolContracts = new Array();

  const provider = new ethers.providers.JsonRpcProvider(rpc);

  const factoryContract = new ethers.Contract(
    FACTORY_CONTRACT,
    factoryABI,
    provider
  );

  // fetch all pools from the blockchain
  const howManyPools = await factoryContract.howManyPools();

  for (let i = 0; i < howManyPools; i++) {
    //get contracts from the blockchain using i as the id's input
    const getCA = await factoryContract.getPool(i); //getPool
    const poolName = await constructPoolName(getCA)
    
    poolContracts.push({ id: i, contract: getCA, name: poolName, apr: 1.00, tvl: 1.00 });
  }

  // function that contruct pool name with the stakedToken address and rewardToken Address
  // using the pool CA
  async function constructPoolName(poolAddress: string) {
    const poolContract = new ethers.Contract(poolAddress, poolAbi, provider);

    const stakedToken = await poolContract.stakedToken();
    const rewardToken = await poolContract.rewardToken();

    const stakedSymbol = await getContractSymbol(stakedToken)
    const rewardSymbol = await getContractSymbol(rewardToken)

    return `${stakedSymbol} - ${rewardSymbol}`
  }

  async function getContractSymbol(tokenAddress: string) {
    const abi = [
      {
        outputs: [
          {
            name: "",
            internalType: "string",
            type: "string",
          },
        ],
        inputs: [],
        name: "symbol",
        stateMutability: "view",
        type: "function",
      },
    ];
    const poolContract = new ethers.Contract(tokenAddress, abi, provider);

    return await poolContract.symbol();
  }

  return poolContracts;
}

export default useGetPools;
