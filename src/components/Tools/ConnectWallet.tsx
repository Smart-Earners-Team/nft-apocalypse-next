import React, { useState, useRef } from "react";
import { SiBinance, SiChainlink } from "react-icons/si";
import useAuthWallet from "../../hooks/useWallet";
import { Networks } from "../../hooks/types";
import { BiPolygon } from "react-icons/bi";
import useNetworkSelectorContext from "../../hooks/useNetworkSelectorContext";
import { networkLists } from "../../config/constants";
import truncateHash from "../../utils/truncateHash";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { network } from "../Navigation";

export const networks: {
  networkIcon: JSX.Element,
  network: string,
  name: Networks,
}[] = [
  { networkIcon: <BiPolygon />, network: "Polygon", name: "Polygon" },
  { networkIcon: <SiBinance />, network: "SmartChain", name: "BSC" },
  { networkIcon: <SiChainlink />, network: "Cronos", name: "Cronos" },
];

export const ConnectWallet: React.FC = ({ connected }: any) => {
  const {account} = useActiveWeb3React()
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { setNetworkInfo } = useNetworkSelectorContext();

  const { onPresentConnectModal } = useAuthWallet();

  const openModal = (net: Networks) => {
    const network = networkLists[net];

    if (network) {
      const { chainId, rpcUrls } = network;
      setNetworkInfo({ chainId, rpcUrl: rpcUrls[0], networkName: network.id });
      onPresentConnectModal();
    }
  };

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside, true);
    } else {
      document.removeEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isOpen]);

  return (
    <div>
      <React.Fragment>
        {!account ? (
          <div ref={ref} className="inline-block relative -top-[3px]">
            <div>
              <span className="">
                <button
                  type="button"
                  className="z-0 md:ml-auto ml-2 w-fit px-3 py-2 text-md leading-5 font-medium text-inherit hover:text-inherit focus:outline-none border border-[#887d748b] rounded-lg"
                  // this hardcoded BSC should be changed to read the state of the user selected network
                  onClick={()=>openModal("BSC")}
                >
                  {
                    connected ? <>{network.symbol} {account}</> : 'Connect Wallet'
                  }
                </button>
              </span>
            </div>

            {true && (
              <div className="absolute top-8 text-center w-fit h-auto text-inherit rounded-md bg-inherit -left-2 md:hidden block">
                <div>
                  <div className="py-1">
                    {networks.map((val, key) => {
                      return (
                        <div key={key}>
                          <button
                            onClick={() => openModal(`${val.name}`)}
                            className="flex align-middle justify-center py-2"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

          </div>
        ) :
        <div className='cursor-pointer md:ml-auto ml-2 w-fit px-3 py-2 text-md leading-5 font-medium text-inherit hover:text-inherit focus:outline-none border border-inherit rounded-lg'>
          {account && (
            <span onClick={() => onPresentConnectModal()}>
              <i className=""/>{truncateHash(account)}
            </span>
          )}
        </div>
}
      </React.Fragment>
    </div>
  );
};
