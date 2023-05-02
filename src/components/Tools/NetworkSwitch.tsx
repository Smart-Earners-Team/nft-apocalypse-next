import React, { useEffect, useState } from 'react';
import { networks } from './ConnectWallet';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import useNetworkSelectorContext from '../../hooks/useNetworkSelectorContext';
import useAuthWallet from '../../hooks/useWallet';
import { Networks } from '../../hooks/types';
import { networkLists } from '../../config/constants';

export const NetworkSwitch = () => {
    const [selectedOption, setSelectedOption] = useState('Select Network');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { account } = useActiveWeb3React();
    const ref = React.useRef<HTMLDivElement>(null);
    const { setNetworkInfo } = useNetworkSelectorContext();

    const { onPresentConnectModal } = useAuthWallet();

    const openModal = (net: Networks) => {
        const network = networkLists[net];

        if (network) {
            const { chainId, rpcUrls } = network;
            setNetworkInfo({ chainId, rpcUrl: rpcUrls?.[0], networkName: network.id });
            onPresentConnectModal();
        }
    };

    const handleOptionClick = (network: string) => {
        console.log(network);
        setSelectedOption(network);
        setDropdownOpen(false);
    };

    useEffect(()=>{
        console.log(networks);
    }, [])

    return (
        <div className="dropdown inline-block z-[99999]">
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                {selectedOption} <span>&#9662;</span>
            </button>
            <div className='relative'>
                {dropdownOpen && (
                    <div className="absolute dropdown-contents bg-white/95 text-slate-900">
                        {networks.map((network, key) => (
                            <div key={key} className="flex px-1 py-1 hover:bg-purple-200">
                                <span className="p-1">{network?.networkIcon}</span>
                                <button
                                    // This should only set the state then the connect button would connect based on the selected network
                                    // This is based on the implementation we choose on the call, that the user should only connect using the connect button
                                    // And not by clicking the desired network name
                                    // And as such the connect button maybe disabled until the user selects a network or maybe be prompted to select network if he hasnt already
                                    onClick={() => {handleOptionClick(network?.name); console.log(network?.name);}
                                        //     {
                                        //     openModal(network?.name);
                                        //     handleOptionClick(network?.name || 'Select Network');
                                        // }
                                    }
                                    className="p-1"
                                >
                                    {network?.network}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
