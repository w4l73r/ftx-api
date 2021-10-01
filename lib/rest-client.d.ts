import { AxiosRequestConfig } from 'axios';
import { GenericAPIResponse, RestClientOptions } from './util/requestUtils';
import RequestWrapper from './util/requestWrapper';
declare type OrderSide = 'buy' | 'sell';
declare type OrderType = 'market' | 'limit';
declare type ConditionalOrderType = 'stop' | 'trailing_stop' | 'take_profit';
declare type ConditionalOrderTypeNoUnderscore = 'stop' | 'trailingStop' | 'takeProfit';
export declare class RestClient {
    protected requestWrapper: RequestWrapper;
    /**
     * @public Creates an instance of the inverse REST API client.
     *
     * @param {string} key - your API key
     * @param {string} secret - your API secret
     * @param {RestClientOptions} [restClientOptions={}] options to configure REST API connectivity
     * @param {AxiosRequestConfig} [requestOptions={}] HTTP networking options for axios
     */
    constructor(key?: string | undefined, secret?: string | undefined, restClientOptions?: RestClientOptions, requestOptions?: AxiosRequestConfig);
    /**
     *
     * Subaccount Endpoints
     * https://docs.ftx.com/#subaccounts
     *
    **/
    getSubaccounts(): GenericAPIResponse;
    createSubaccount(nickname: string): GenericAPIResponse;
    changeSubaccountName(params: {
        nickname: string;
        newNickname: string;
    }): GenericAPIResponse;
    deleteSubaccount(nickname: string): GenericAPIResponse;
    getSubaccountBalances(nickname: string): GenericAPIResponse;
    transferBetweenSubaccounts(params: {
        coin: string;
        size: number;
        source: string;
        destination: string;
    }): GenericAPIResponse;
    /**
     *
     * Market Endpoints
     * https://docs.ftx.com/#markets
     *
    **/
    getMarkets(): GenericAPIResponse;
    getMarket(marketName: string): GenericAPIResponse;
    getOrderbook(params: {
        marketName: string;
        depth?: number;
    }): GenericAPIResponse;
    getTrades(params: {
        market_name: string;
        limit?: number;
        start_time?: number;
        end_time?: number;
    }): GenericAPIResponse;
    getHistoricalPrices(params: {
        market_name: string;
        resolution: number;
        limit?: number;
        start_time?: number;
        end_time?: number;
    }): GenericAPIResponse;
    /**
     *
     * Futures Endpoints
     * https://docs.ftx.com/#futures
     *
    **/
    listAllFutures(): GenericAPIResponse;
    getFuture(futureName: string): GenericAPIResponse;
    getFutureStats(futureName: string): GenericAPIResponse;
    getFundingRates(): GenericAPIResponse;
    getIndexWeights(futuresIndexName: string): GenericAPIResponse;
    getExpiredFutures(): GenericAPIResponse;
    getHistoricalIndex(params: {
        marketName: string;
        resolution: number;
        limit?: number;
        start_time?: number;
        end_time?: number;
    }): GenericAPIResponse;
    /**
     *
     * Account Endpoints
     * https://docs.ftx.com/#account
     *
    **/
    getAccount(): GenericAPIResponse;
    getPositions(showAveragePrice?: boolean): GenericAPIResponse;
    setAccountLeverage(leverage: number): GenericAPIResponse;
    /**
     *
     * Wallet Endpoints
     * https://docs.ftx.com/#wallet
     *
    **/
    getCoins(): GenericAPIResponse;
    getBalances(): GenericAPIResponse;
    getBalancesAllAccounts(): GenericAPIResponse;
    getDepositAddress(params: {
        coin: string;
        method?: string;
    }): GenericAPIResponse;
    getDepositHistory(params?: {
        limit?: number;
        start_time?: number;
        end_time?: number;
    }): GenericAPIResponse;
    getWithdrawalHistory(params?: {
        limit?: number;
        start_time?: number;
        end_time?: number;
    }): GenericAPIResponse;
    requestWithdrawal(params: {
        coin: string;
        size: number;
        address: string;
        tag?: string;
        password?: string;
        code?: string;
    }): GenericAPIResponse;
    getAirdrops(params?: {
        limit?: number;
        start_time?: number;
        end_time?: number;
    }): GenericAPIResponse;
    getSavedAddresses(coin?: string): GenericAPIResponse;
    createSavedAddress(params: {
        coin: string;
        address: string;
        addressName: string;
        isPrimeTrust: boolean;
        tag?: string;
    }): GenericAPIResponse;
    deleteSavedAddress(savedAddressId: number): GenericAPIResponse;
    /**
     *
     * Order Endpoints
     * https://docs.ftx.com/#wallet
     *
    **/
    getOpenOrders(market?: string): GenericAPIResponse;
    getOrderHistory(params?: {
        market?: string;
        start_time?: number;
        end_time?: number;
        limit?: number;
    }): GenericAPIResponse;
    getOpenTriggerOrders(params?: {
        market?: string;
        type?: ConditionalOrderType;
    }): GenericAPIResponse;
    getTriggerOrderTriggers(conditionalOrderId: string): GenericAPIResponse;
    getTriggerOrderHistory(params?: {
        market?: string;
        start_time?: number;
        end_time?: number;
        side?: OrderSide;
        type?: ConditionalOrderType;
        orderType?: OrderType;
        limit?: number;
    }): GenericAPIResponse;
    placeOrder(params: {
        market: string;
        side: OrderSide;
        price: number | null;
        type: OrderType;
        size: number;
        reduceOnly?: boolean;
        ioc?: boolean;
        postOnly?: boolean;
        clientId?: string;
    }): GenericAPIResponse;
    placeTriggerOrder(params: {
        market: string;
        side: OrderSide;
        size: number;
        type: ConditionalOrderTypeNoUnderscore;
        reduceOnly?: boolean;
        retryUntilFilled?: boolean;
        triggerPrice?: number;
        orderPrice?: number;
        trailValue?: number;
    }): GenericAPIResponse;
    modifyOrder(params: {
        orderId: string;
        price?: number;
        size?: number;
        clientId?: string;
    }): GenericAPIResponse;
    modifyOrderByClientId(clientOrderId: string, params: {
        price?: number;
        size?: number;
        clientId?: string;
    }): GenericAPIResponse;
    modifyTriggerOrder(orderId: string, params: {
        size?: number;
        triggerPrice?: number;
        orderPrice?: number;
        trailValue?: number;
    }): GenericAPIResponse;
    getOrderStatus(orderId: string): GenericAPIResponse;
    getOrderStatusByClientId(clientOrderId: string): GenericAPIResponse;
    cancelOrder(orderId: string): GenericAPIResponse;
    cancelOrderByClientId(clientOrderId: string): GenericAPIResponse;
    cancelOpenTriggerOrder(conditionalOrderId: string): GenericAPIResponse;
    cancelAllOrders(params?: {
        market?: string;
        conditionalOrdersOnly?: boolean;
        limitOrdersOnly?: boolean;
    }): GenericAPIResponse;
    /**
     *
     * Convert Endpoints
     * https://docs.ftx.com/#convert
     *
    **/
    requestQuote(params: {
        fromCoin: string;
        toCoin: string;
        size: number;
    }): GenericAPIResponse;
    getQuoteStatus(quoteId: string, market?: string): GenericAPIResponse;
    acceptQuote(quoteId: string): GenericAPIResponse;
    /**
     *
     * Spot Margin Endpoints
     * https://docs.ftx.com/#spot-margin
     *
    **/
    getBorrowRates(): GenericAPIResponse;
    getLendingRates(): GenericAPIResponse;
    getDailyBorrowedAmounts(): GenericAPIResponse;
    getMarketInfo(market?: string): GenericAPIResponse;
    getBorrowHistory(): GenericAPIResponse;
    getLendingHistory(): GenericAPIResponse;
    getLendingOffers(): GenericAPIResponse;
    getLendingInfo(): GenericAPIResponse;
    submitLendingOffer(params: {
        coin: string;
        size: number;
        rate: number;
    }): GenericAPIResponse;
    /**
     *
     * Misc Endpoints (fills, & funding)
     * https://docs.ftx.com/#fills
     *
    **/
    getFills(params: {
        market?: string;
        limit?: number;
        start_time?: number;
        end_time?: number;
        order?: 'asc';
        orderId: number;
    }): GenericAPIResponse;
    getFundingPayments(params?: {
        start_time?: number;
        end_time?: number;
        future?: string;
    }): GenericAPIResponse;
    /**
     *
     * Leveraged Tokens Endpoints
     * https://docs.ftx.com/#leveraged-tokens
     *
    **/
    listLeveragedTokens(): GenericAPIResponse;
    getLeveragedTokenInfo(tokenName: string): GenericAPIResponse;
    getLeveragedTokenBalances(): GenericAPIResponse;
    listLeveragedTokenCreationRequests(): GenericAPIResponse;
    requestLeveragedTokenCreation(tokenName: string, size: number): GenericAPIResponse;
    listLeveragedTokenRedemptionRequests(): GenericAPIResponse;
    requestLeveragedTokenRedemption(tokenName: string, size: number): GenericAPIResponse;
    /**
     *
     * Options Endpoints
     * https://docs.ftx.com/#options
     *
    **/
    listQuoteRequests(): GenericAPIResponse;
    getMyQuoteRequests(): GenericAPIResponse;
    createQuoteRequest(params: {
        underlying: string;
        type: 'call' | 'put';
        strike: number;
        expiry: number;
        side: OrderSide;
        size: number;
        limitPrice?: number;
        hideLimitPrice: boolean;
        requestExpiry?: number;
        counterpartyId?: number;
    }): GenericAPIResponse;
    cancelQuoteRequest(quoteRequestId: string): GenericAPIResponse;
    getQuotesForQuoteRequest(quoteRequestId: string): GenericAPIResponse;
    createQuote(quoteRequestId: string, price: number): GenericAPIResponse;
    getMyQuotes(): GenericAPIResponse;
    cancelQuote(quoteId: string): GenericAPIResponse;
    acceptOptionsQuote(quoteId: string): GenericAPIResponse;
    getOptionsAccountInfo(): GenericAPIResponse;
    getOptionsPositions(): GenericAPIResponse;
    getPublicOptionsTrades(params?: {
        start_time?: number;
        end_time?: number;
        limit?: number;
    }): GenericAPIResponse;
    getOptionsFills(params?: {
        start_time?: number;
        end_time?: number;
        limit?: number;
    }): GenericAPIResponse;
    get24hOptionVolume(): GenericAPIResponse;
    getOptionsHistoricalVolumes(params?: {
        start_time?: number;
        end_time?: number;
        limit?: number;
    }): GenericAPIResponse;
    getOptionsOpenInterest(): GenericAPIResponse;
    getOptionsHistoricalOpenInterest(params?: {
        start_time?: number;
        end_time?: number;
        limit?: number;
    }): GenericAPIResponse;
    /**
     *
     * SRM Staking Endpoints
     * https://docs.ftx.com/#srm-staking
     *
    **/
    getStakes(): GenericAPIResponse;
    getUnstakeRequests(): GenericAPIResponse;
    getStakeBalances(): GenericAPIResponse;
    createUnstakeRequest(coin: string, size: number): GenericAPIResponse;
    cancelUnstakeRequest(unstakeRequestId: string): GenericAPIResponse;
    getStakingRewards(): GenericAPIResponse;
    createStakeRequest(coin: string, size: number): GenericAPIResponse;
    getServerTime(): GenericAPIResponse;
    getApiKeyInfo(): GenericAPIResponse;
    /**
     * @deprecated move this somewhere else, because endpoints shouldn't be hardcoded here
     */
    getTimeOffset(): Promise<number>;
}
export {};
