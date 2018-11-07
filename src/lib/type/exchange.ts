export interface APIKey {
  id: string;
  secret: string;
  name: string;
  nonce: number;
  cidr?: string;
  permissions?: Array<any>;
  enabled?: boolean;
  userId: number;
  created?: Date;
}

export interface AccessToken {
  id: string;
  /**
   * time to live in seconds (2 weeks by default)
   */
  ttl?: number;
  created?: Date;
  userId?: number;
}

export interface Affiliate {
  account: number;
  currency: string;
  prevPayout?: number;
  prevTurnover?: number;
  prevComm?: number;
  prevTimestamp?: Date;
  execTurnover?: number;
  execComm?: number;
  totalReferrals?: number;
  totalTurnover?: number;
  totalComm?: number;
  payoutPcnt?: number;
  pendingPayout?: number;
  timestamp?: Date;
}

export interface Announcement {
  id: number;
  link?: string;
  title?: string;
  content?: string;
  date?: Date;
}

export interface Chat {
  id?: number;
  date: Date;
  user: string;
  message: string;
  html: string;
  fromBot?: boolean;
  channelID?: number;
}

export interface ChatChannel {
  id?: number;
  name: string;
}

export interface ConnectedUsers {
  users?: number;
  bots?: number;
}

export interface Error {
  error?: ErrorError;
}

export interface ErrorError {
  message: string;
  name: string;
}

export interface Execution {
  execID: string;
  orderID?: string;
  clOrdID?: string;
  clOrdLinkID?: string;
  account?: number;
  symbol?: string;
  side?: string;
  lastQty?: number;
  lastPx?: number;
  underlyingLastPx?: number;
  lastMkt?: string;
  lastLiquidityInd?: string;
  simpleOrderQty?: number;
  orderQty?: number;
  price?: number;
  displayQty?: number;
  stopPx?: number;
  pegOffsetValue?: number;
  pegPriceType?: string;
  currency?: string;
  settlCurrency?: string;
  execType?: string;
  ordType?: string;
  timeInForce?: string;
  execInst?: string;
  contingencyType?: string;
  exDestination?: string;
  ordStatus?: string;
  triggered?: string;
  workingIndicator?: boolean;
  ordRejReason?: string;
  simpleLeavesQty?: number;
  leavesQty?: number;
  simpleCumQty?: number;
  cumQty?: number;
  avgPx?: number;
  commission?: number;
  tradePublishIndicator?: string;
  multiLegReportingType?: string;
  text?: string;
  trdMatchID?: string;
  execCost?: number;
  execComm?: number;
  homeNotional?: number;
  foreignNotional?: number;
  transactTime?: Date;
  timestamp?: Date;
}

export interface Funding {
  timestamp: Date;
  symbol: string;
  fundingInterval?: Date;
  fundingRate?: number;
  fundingRateDaily?: number;
}

export interface InlineResponse200 {
  success?: boolean;
}

export interface Instrument {
  symbol: string;
  rootSymbol?: string;
  state?: string;
  typ?: string;
  listing?: Date;
  front?: Date;
  expiry?: Date;
  settle?: Date;
  relistInterval?: Date;
  inverseLeg?: string;
  sellLeg?: string;
  buyLeg?: string;
  positionCurrency?: string;
  underlying?: string;
  quoteCurrency?: string;
  underlyingSymbol?: string;
  reference?: string;
  referenceSymbol?: string;
  calcInterval?: Date;
  publishInterval?: Date;
  publishTime?: Date;
  maxOrderQty?: number;
  maxPrice?: number;
  lotSize?: number;
  tickSize?: number;
  multiplier?: number;
  settlCurrency?: string;
  underlyingToPositionMultiplier?: number;
  underlyingToSettleMultiplier?: number;
  quoteToSettleMultiplier?: number;
  isQuanto?: boolean;
  isInverse?: boolean;
  initMargin?: number;
  maintMargin?: number;
  riskLimit?: number;
  riskStep?: number;
  limit?: number;
  capped?: boolean;
  taxed?: boolean;
  deleverage?: boolean;
  makerFee?: number;
  takerFee?: number;
  settlementFee?: number;
  insuranceFee?: number;
  fundingBaseSymbol?: string;
  fundingQuoteSymbol?: string;
  fundingPremiumSymbol?: string;
  fundingTimestamp?: Date;
  fundingInterval?: Date;
  fundingRate?: number;
  indicativeFundingRate?: number;
  rebalanceTimestamp?: Date;
  rebalanceInterval?: Date;
  openingTimestamp?: Date;
  closingTimestamp?: Date;
  sessionInterval?: Date;
  prevClosePrice?: number;
  limitDownPrice?: number;
  limitUpPrice?: number;
  bankruptLimitDownPrice?: number;
  bankruptLimitUpPrice?: number;
  prevTotalVolume?: number;
  totalVolume?: number;
  volume?: number;
  volume24h?: number;
  prevTotalTurnover?: number;
  totalTurnover?: number;
  turnover?: number;
  turnover24h?: number;
  prevPrice24h?: number;
  vwap?: number;
  highPrice?: number;
  lowPrice?: number;
  lastPrice?: number;
  lastPriceProtected?: number;
  lastTickDirection?: string;
  lastChangePcnt?: number;
  bidPrice?: number;
  midPrice?: number;
  askPrice?: number;
  impactBidPrice?: number;
  impactMidPrice?: number;
  impactAskPrice?: number;
  hasLiquidity?: boolean;
  openInterest?: number;
  openValue?: number;
  fairMethod?: string;
  fairBasisRate?: number;
  fairBasis?: number;
  fairPrice?: number;
  markMethod?: string;
  markPrice?: number;
  indicativeTaxRate?: number;
  indicativeSettlePrice?: number;
  settledPrice?: number;
  timestamp?: Date;
}

export interface InstrumentInterval {
  intervals: Array<string>;
  symbols: Array<string>;
}

export interface Insurance {
  currency: string;
  timestamp: Date;
  walletBalance?: number;
}

export interface Leaderboard {
  name: string;
  isRealName?: boolean;
  isMe?: boolean;
  profit?: number;
}

export interface Liquidation {
  orderID: string;
  symbol?: string;
  side?: string;
  price?: number;
  leavesQty?: number;
}

export interface Margin {
  account: number;
  currency: string;
  riskLimit?: number;
  prevState?: string;
  state?: string;
  action?: string;
  amount?: number;
  pendingCredit?: number;
  pendingDebit?: number;
  confirmedDebit?: number;
  prevRealisedPnl?: number;
  prevUnrealisedPnl?: number;
  grossComm?: number;
  grossOpenCost?: number;
  grossOpenPremium?: number;
  grossExecCost?: number;
  grossMarkValue?: number;
  riskValue?: number;
  taxableMargin?: number;
  initMargin?: number;
  maintMargin?: number;
  sessionMargin?: number;
  targetExcessMargin?: number;
  varMargin?: number;
  realisedPnl?: number;
  unrealisedPnl?: number;
  indicativeTax?: number;
  unrealisedProfit?: number;
  syntheticMargin?: number;
  walletBalance?: number;
  marginBalance?: number;
  marginBalancePcnt?: number;
  marginLeverage?: number;
  marginUsedPcnt?: number;
  excessMargin?: number;
  excessMarginPcnt?: number;
  availableMargin?: number;
  withdrawableMargin?: number;
  timestamp?: Date;
  grossLastValue?: number;
  commission?: number;
}

export interface Order extends Error {
  orderID: string;
  clOrdID?: string;
  clOrdLinkID?: string;
  account?: number;
  symbol?: string;
  side?: string;
  simpleOrderQty?: number;
  orderQty?: number;
  price?: number;
  displayQty?: number;
  stopPx?: number;
  pegOffsetValue?: number;
  pegPriceType?: string;
  currency?: string;
  settlCurrency?: string;
  ordType?: string;
  timeInForce?: string;
  execInst?: string;
  contingencyType?: string;
  exDestination?: string;
  ordStatus?: string;
  triggered?: string;
  workingIndicator?: boolean;
  ordRejReason?: string;
  simpleLeavesQty?: number;
  leavesQty?: number;
  simpleCumQty?: number;
  cumQty?: number;
  avgPx?: number;
  multiLegReportingType?: string;
  text?: string;
  transactTime?: Date;
  timestamp?: Date;
}

export interface OrderBook {
  symbol: string;
  level: number;
  bidSize?: number;
  bidPrice?: number;
  askPrice?: number;
  askSize?: number;
  timestamp?: Date;
}

export interface OrderBookL2 {
  symbol: string;
  id: number;
  side: string;
  size?: number;
  price?: number;
}

export interface OrderBook10 {
  symbol: string;
  bids: [[number, number]];
  asks: [[number, number]];
  timestamp: string;
}

export interface Position {
  account: number;
  symbol: string;
  currency: string;
  underlying?: string;
  quoteCurrency?: string;
  commission?: number;
  initMarginReq?: number;
  maintMarginReq?: number;
  riskLimit?: number;
  leverage?: number;
  crossMargin?: boolean;
  deleveragePercentile?: number;
  rebalancedPnl?: number;
  prevRealisedPnl?: number;
  prevUnrealisedPnl?: number;
  prevClosePrice?: number;
  openingTimestamp?: Date;
  openingQty?: number;
  openingCost?: number;
  openingComm?: number;
  openOrderBuyQty?: number;
  openOrderBuyCost?: number;
  openOrderBuyPremium?: number;
  openOrderSellQty?: number;
  openOrderSellCost?: number;
  openOrderSellPremium?: number;
  execBuyQty?: number;
  execBuyCost?: number;
  execSellQty?: number;
  execSellCost?: number;
  execQty?: number;
  execCost?: number;
  execComm?: number;
  currentTimestamp?: Date;
  currentQty: number;
  currentCost?: number;
  currentComm?: number;
  realisedCost?: number;
  unrealisedCost?: number;
  grossOpenCost?: number;
  grossOpenPremium?: number;
  grossExecCost?: number;
  isOpen?: boolean;
  markPrice?: number;
  markValue?: number;
  riskValue?: number;
  homeNotional?: number;
  foreignNotional?: number;
  posState?: string;
  posCost?: number;
  posCost2?: number;
  posCross?: number;
  posInit?: number;
  posComm?: number;
  posLoss?: number;
  posMargin?: number;
  posMaint?: number;
  posAllowance?: number;
  taxableMargin?: number;
  initMargin?: number;
  maintMargin?: number;
  sessionMargin?: number;
  targetExcessMargin?: number;
  varMargin?: number;
  realisedGrossPnl?: number;
  realisedTax?: number;
  realisedPnl?: number;
  unrealisedGrossPnl?: number;
  longBankrupt?: number;
  shortBankrupt?: number;
  taxBase?: number;
  indicativeTaxRate?: number;
  indicativeTax?: number;
  unrealisedTax?: number;
  unrealisedPnl?: number;
  unrealisedPnlPcnt?: number;
  unrealisedRoePcnt?: number;
  simpleQty?: number;
  simpleCost?: number;
  simpleValue?: number;
  simplePnl?: number;
  simplePnlPcnt?: number;
  avgCostPrice?: number;
  avgEntryPrice?: number;
  breakEvenPrice?: number;
  marginCallPrice?: number;
  liquidationPrice?: number;
  bankruptPrice?: number;
  timestamp?: Date;
  lastPrice?: number;
  lastValue?: number;
}

export interface Quote {
  timestamp: Date;
  symbol: string;
  bidSize?: number;
  bidPrice?: number;
  askPrice?: number;
  askSize?: number;
}

export interface Settlement {
  timestamp: Date;
  symbol: string;
  settlementType?: string;
  settledPrice?: number;
  bankrupt?: number;
  taxBase?: number;
  taxRate?: number;
}

export interface Stats {
  rootSymbol: string;
  currency?: string;
  volume24h?: number;
  turnover24h?: number;
  openInterest?: number;
  openValue?: number;
}

export interface StatsHistory {
  date: Date;
  rootSymbol: string;
  currency?: string;
  volume?: number;
  turnover?: number;
}

export interface Trade {
  timestamp: Date;
  symbol: string;
  side?: string;
  size?: number;
  price?: number;
  tickDirection?: string;
  trdMatchID?: string;
  grossValue?: number;
  homeNotional?: number;
  foreignNotional?: number;
}

export interface TradeBin {
  timestamp: Date;
  symbol: string;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  trades?: number;
  volume?: number;
  vwap?: number;
  lastSize?: number;
  turnover?: number;
  homeNotional?: number;
  foreignNotional?: number;
}

export interface Transaction {
  transactID: string;
  account?: number;
  currency?: string;
  transactType?: string;
  amount?: number;
  fee?: number;
  transactStatus?: string;
  address?: string;
  tx?: string;
  text?: string;
  transactTime?: Date;
  timestamp?: Date;
}

export interface User {
  id?: number;
  ownerId?: number;
  firstname?: string;
  lastname?: string;
  username: string;
  email: string;
  phone?: string;
  created?: Date;
  lastUpdated?: Date;
  preferences?: UserPreferences;
  tFAEnabled?: string;
  affiliateID?: string;
  pgpPubKey?: string;
  country?: string;
}

export interface UserCommission {
  makerFee?: number;
  takerFee?: number;
  settlementFee?: number;
  maxFee?: number;
}

export interface UserPreferences {
  animationsEnabled?: boolean;
  announcementsLastSeen?: Date;
  chatChannelID?: number;
  colorTheme?: string;
  currency?: string;
  debug?: boolean;
  disableEmails?: Array<string>;
  hideConfirmDialogs?: Array<string>;
  hideConnectionModal?: boolean;
  hideFromLeaderboard?: boolean;
  hideNameFromLeaderboard?: boolean;
  hideNotifications?: Array<string>;
  locale?: string;
  msgsSeen?: Array<string>;
  orderBookBinning?: any;
  orderBookType?: string;
  orderControlsPlusMinus?: boolean;
  sounds?: Array<string>;
  strictIPCheck?: boolean;
  strictTimeout?: boolean;
  tickerGroup?: string;
  tickerPinned?: boolean;
  tradeLayout?: string;
}

export interface Wallet {
  account: number;
  currency: string;
  prevDeposited?: number;
  prevWithdrawn?: number;
  prevAmount?: number;
  prevTimestamp?: Date;
  deltaDeposited?: number;
  deltaWithdrawn?: number;
  deltaAmount?: number;
  deposited?: number;
  withdrawn?: number;
  amount?: number;
  pendingCredit?: number;
  pendingDebit?: number;
  confirmedDebit?: number;
  timestamp?: Date;
  addr?: string;
  withdrawalLock?: Array<any>;
}
