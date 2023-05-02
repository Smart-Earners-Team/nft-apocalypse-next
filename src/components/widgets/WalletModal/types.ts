// viewed
import { FC } from "react";
import { SvgProps } from "../../Svg/types";
import type { Networks } from "../../../hooks/types";

export enum ConnectorNames {
  Injected = "injected",
  WalletConnect = "walletconnect",
  BSC = "bsc",
}

export type Login = (connectorId: ConnectorNames, network: Networks) => void;
export type Logout = () => void;

export interface Config {
  title: string;
  icon: FC<SvgProps>;
  connectorId: ConnectorNames;
  priority: number;
}
