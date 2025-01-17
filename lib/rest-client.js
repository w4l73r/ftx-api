"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestClient = void 0;
const requestUtils_1 = require("./util/requestUtils");
const requestWrapper_1 = __importDefault(require("./util/requestWrapper"));
class RestClient {
    /**
     * @public Creates an instance of the inverse REST API client.
     *
     * @param {string} key - your API key
     * @param {string} secret - your API secret
     * @param {RestClientOptions} [restClientOptions={}] options to configure REST API connectivity
     * @param {AxiosRequestConfig} [requestOptions={}] HTTP networking options for axios
     */
    constructor(key, secret, restClientOptions = {}, requestOptions = {}) {
        this.requestWrapper = new requestWrapper_1.default(key, secret, requestUtils_1.getRestBaseUrl(restClientOptions), restClientOptions, requestOptions);
        return this;
    }
    /**
     *
     * Subaccount Endpoints
     * https://docs.ftx.com/#subaccounts
     *
    **/
    setHttpOption(key, value) {
        return this.requestWrapper.setRequestOptions(key, value);
    }
    getSubaccounts() {
        return this.requestWrapper.get('subaccounts');
    }
    createSubaccount(nickname) {
        return this.requestWrapper.post('subaccounts', { nickname });
    }
    changeSubaccountName(params) {
        return this.requestWrapper.post('subaccounts/update_name', params);
    }
    deleteSubaccount(nickname) {
        return this.requestWrapper.delete('subaccounts', { nickname });
    }
    getSubaccountBalances(nickname) {
        return this.requestWrapper.get(`subaccounts/${nickname}/balances`);
    }
    transferBetweenSubaccounts(params) {
        return this.requestWrapper.post('subaccounts/transfer', params);
    }
    /**
     *
     * Market Endpoints
     * https://docs.ftx.com/#markets
     *
    **/
    getMarkets() {
        return this.requestWrapper.get('markets');
    }
    getMarket(marketName) {
        return this.requestWrapper.get(`markets/${marketName}`);
    }
    getOrderbook(params) {
        const suffix = params.depth ? `?depth=${params.depth}` : '';
        return this.requestWrapper.get(`markets/${params.marketName}/orderbook${suffix}`);
    }
    getTrades(params) {
        return this.requestWrapper.get(`markets/${params.market_name}/trades`, params);
    }
    getHistoricalPrices(params) {
        return this.requestWrapper.get(`markets/${params.market_name}/candles`, params);
    }
    /**
     *
     * Futures Endpoints
     * https://docs.ftx.com/#futures
     *
    **/
    listAllFutures() {
        return this.requestWrapper.get('futures');
    }
    getFuture(futureName) {
        return this.requestWrapper.get(`futures/${futureName}`);
    }
    getFutureStats(futureName) {
        return this.requestWrapper.get(`futures/${futureName}/stats`);
    }
    getFundingRates() {
        return this.requestWrapper.get('funding_rates');
    }
    getIndexWeights(futuresIndexName) {
        return this.requestWrapper.get(`indexes/${futuresIndexName}/weights`);
    }
    getExpiredFutures() {
        return this.requestWrapper.get('expired_futures');
    }
    getHistoricalIndex(params) {
        return this.requestWrapper.get(`indexes/${params.marketName}/candles`, params);
    }
    /**
     *
     * Account Endpoints
     * https://docs.ftx.com/#account
     *
    **/
    getAccount() {
        return this.requestWrapper.get('account');
    }
    getPositions(showAveragePrice) {
        const suffix = showAveragePrice ? '?showAvgPrice=true' : '';
        return this.requestWrapper.get(`positions${suffix}`);
    }
    setAccountLeverage(leverage) {
        return this.requestWrapper.post('account/leverage', { leverage });
    }
    /**
     *
     * Wallet Endpoints
     * https://docs.ftx.com/#wallet
     *
    **/
    getCoins() {
        return this.requestWrapper.get('wallet/coins');
    }
    getBalances() {
        return this.requestWrapper.get('wallet/balances');
    }
    getBalancesAllAccounts() {
        return this.requestWrapper.get('wallet/all_balances');
    }
    getDepositAddress(params) {
        const suffix = params.method ? `?method=${params.method}` : '';
        return this.requestWrapper.get(`wallet/deposit_address/${params.coin}${suffix}`);
    }
    getDepositHistory(params) {
        return this.requestWrapper.get('wallet/deposits', params);
    }
    getWithdrawalHistory(params) {
        return this.requestWrapper.get('wallet/withdrawals', params);
    }
    requestWithdrawal(params) {
        return this.requestWrapper.post('wallet/withdrawals', params);
    }
    getAirdrops(params) {
        return this.requestWrapper.get('wallet/airdrops', params);
    }
    getSavedAddresses(coin) {
        return this.requestWrapper.get('wallet/saved_addresses', { coin });
    }
    createSavedAddress(params) {
        return this.requestWrapper.post('wallet/saved_addresses', params);
    }
    deleteSavedAddress(savedAddressId) {
        return this.requestWrapper.delete(`wallet/saved_addresses/${savedAddressId}`);
    }
    /**
     *
     * Order Endpoints
     * https://docs.ftx.com/#wallet
     *
    **/
    getOpenOrders(market) {
        const suffix = market ? `?market=${market}` : '';
        return this.requestWrapper.get(`orders${suffix}`);
    }
    getOrderHistory(params) {
        return this.requestWrapper.get(`orders/history`, params);
    }
    getOpenTriggerOrders(params) {
        return this.requestWrapper.get(`conditional_orders`, params);
    }
    getTriggerOrderTriggers(conditionalOrderId) {
        return this.requestWrapper.get(`conditional_orders/${conditionalOrderId}/triggers`);
    }
    getTriggerOrderHistory(params) {
        return this.requestWrapper.get(`orders`, params);
    }
    placeOrder(params) {
        return this.requestWrapper.post('orders', params);
    }
    placeTriggerOrder(params) {
        return this.requestWrapper.post('conditional_orders', params);
    }
    modifyOrder(params) {
        return this.requestWrapper.post(`orders/${params.orderId}/modify`, {
            size: params.size,
            price: params.price,
            clientId: params.clientId
        });
    }
    modifyOrderByClientId(clientOrderId, params) {
        return this.requestWrapper.post(`orders/by_client_id/${clientOrderId}/modify`, params);
    }
    modifyTriggerOrder(orderId, params) {
        return this.requestWrapper.post(`conditional_orders/${orderId}/modify`, params);
    }
    getOrderStatus(orderId) {
        return this.requestWrapper.get(`orders/${orderId}`);
    }
    getOrderStatusByClientId(clientOrderId) {
        return this.requestWrapper.get(`orders/by_client_id/${clientOrderId}`);
    }
    cancelOrder(orderId) {
        return this.requestWrapper.delete(`orders/${orderId}`);
    }
    cancelOrderByClientId(clientOrderId) {
        return this.requestWrapper.delete(`orders/by_client_id/${clientOrderId}`);
    }
    cancelOpenTriggerOrder(conditionalOrderId) {
        return this.requestWrapper.delete(`conditional_orders/${conditionalOrderId}`);
    }
    cancelAllOrders(params) {
        return this.requestWrapper.delete('orders', params);
    }
    /**
     *
     * Convert Endpoints
     * https://docs.ftx.com/#convert
     *
    **/
    requestQuote(params) {
        return this.requestWrapper.post(`otc/quotes`, params);
    }
    getQuoteStatus(quoteId, market) {
        const suffix = market ? `?market=${market}` : '';
        return this.requestWrapper.get(`otc/quotes/${quoteId}${suffix}`);
    }
    acceptQuote(quoteId) {
        return this.requestWrapper.post(`otc/quotes/${quoteId}/accept`);
    }
    /**
     *
     * Spot Margin Endpoints
     * https://docs.ftx.com/#spot-margin
     *
    **/
    getBorrowRates() {
        return this.requestWrapper.get(`spot_margin/borrow_rates`);
    }
    getLendingRates() {
        return this.requestWrapper.get(`spot_margin/lending_rates`);
    }
    getDailyBorrowedAmounts() {
        return this.requestWrapper.get(`spot_margin/borrow_summary`);
    }
    getMarketInfo(market) {
        const suffix = market ? `?market=${market}` : '';
        return this.requestWrapper.get(`spot_margin/market_info${suffix}`);
    }
    getBorrowHistory() {
        return this.requestWrapper.get(`spot_margin/borrow_history`);
    }
    getLendingHistory() {
        return this.requestWrapper.get(`spot_margin/lending_history`);
    }
    getLendingOffers() {
        return this.requestWrapper.get(`spot_margin/offers`);
    }
    getLendingInfo() {
        return this.requestWrapper.get(`spot_margin/lending_info`);
    }
    submitLendingOffer(params) {
        return this.requestWrapper.post(`spot_margin/offers`, params);
    }
    /**
     *
     * Misc Endpoints (fills, & funding)
     * https://docs.ftx.com/#fills
     *
    **/
    getFills(params) {
        return this.requestWrapper.get(`fills`, params);
    }
    getFundingPayments(params) {
        return this.requestWrapper.get(`funding_payments`, params);
    }
    /**
     *
     * Leveraged Tokens Endpoints
     * https://docs.ftx.com/#leveraged-tokens
     *
    **/
    listLeveragedTokens() {
        return this.requestWrapper.get(`lt/tokens`);
    }
    getLeveragedTokenInfo(tokenName) {
        return this.requestWrapper.get(`lt/${tokenName}`);
    }
    getLeveragedTokenBalances() {
        return this.requestWrapper.get(`lt/balances`);
    }
    listLeveragedTokenCreationRequests() {
        return this.requestWrapper.get(`lt/creations`);
    }
    requestLeveragedTokenCreation(tokenName, size) {
        return this.requestWrapper.post(`lt/${tokenName}`, { size });
    }
    listLeveragedTokenRedemptionRequests() {
        return this.requestWrapper.get(`lt/redemptions`);
    }
    requestLeveragedTokenRedemption(tokenName, size) {
        return this.requestWrapper.post(`lt/${tokenName}/redeem`, { size });
    }
    /**
     *
     * Options Endpoints
     * https://docs.ftx.com/#options
     *
    **/
    listQuoteRequests() {
        return this.requestWrapper.get(`options/requests`);
    }
    getMyQuoteRequests() {
        return this.requestWrapper.get(`options/my_requests`);
    }
    createQuoteRequest(params) {
        return this.requestWrapper.post(`options/requests`, params);
    }
    cancelQuoteRequest(quoteRequestId) {
        return this.requestWrapper.delete(`options/requests/${quoteRequestId}`);
    }
    getQuotesForQuoteRequest(quoteRequestId) {
        return this.requestWrapper.get(`options/requests/${quoteRequestId}/quotes`);
    }
    createQuote(quoteRequestId, price) {
        return this.requestWrapper.post(`options/requests/${quoteRequestId}`, { price });
    }
    getMyQuotes() {
        return this.requestWrapper.get(`options/my_quotes`);
    }
    cancelQuote(quoteId) {
        return this.requestWrapper.delete(`options/quotes/${quoteId}`);
    }
    acceptOptionsQuote(quoteId) {
        return this.requestWrapper.post(`options/quotes/${quoteId}/accept`);
    }
    getOptionsAccountInfo() {
        return this.requestWrapper.get(`options/account_info`);
    }
    getOptionsPositions() {
        return this.requestWrapper.get(`options/positions`);
    }
    getPublicOptionsTrades(params) {
        return this.requestWrapper.get(`options/trades`, params);
    }
    getOptionsFills(params) {
        return this.requestWrapper.get(`options/fills`, params);
    }
    get24hOptionVolume() {
        return this.requestWrapper.get(`options/24h_options_volume`);
    }
    getOptionsHistoricalVolumes(params) {
        return this.requestWrapper.get(`options/historical_volumes/BTC`, params);
    }
    getOptionsOpenInterest() {
        return this.requestWrapper.get(`options/open_interest/BTC`);
    }
    getOptionsHistoricalOpenInterest(params) {
        return this.requestWrapper.get(`options/historical_open_interest/BTC`, params);
    }
    /**
     *
     * SRM Staking Endpoints
     * https://docs.ftx.com/#srm-staking
     *
    **/
    getStakes() {
        return this.requestWrapper.get(`staking/stakes`);
    }
    getUnstakeRequests() {
        return this.requestWrapper.get(`staking/unstake_requests`);
    }
    getStakeBalances() {
        return this.requestWrapper.get(`staking/balances`);
    }
    createUnstakeRequest(coin, size) {
        return this.requestWrapper.post(`staking/unstake_requests`, { coin, size });
    }
    cancelUnstakeRequest(unstakeRequestId) {
        return this.requestWrapper.delete(`staking/unstake_requests/${unstakeRequestId}`);
    }
    getStakingRewards() {
        return this.requestWrapper.get(`staking/staking_rewards`);
    }
    createStakeRequest(coin, size) {
        return this.requestWrapper.post(`staking/stakes`, { coin, size });
    }
    getServerTime() {
        return this.requestWrapper.get('https://otc.ftx.com/api/time');
    }
    getApiKeyInfo() {
        return this.requestWrapper.get('api_key_status');
    }
    /**
     * @deprecated move this somewhere else, because endpoints shouldn't be hardcoded here
     */
    getTimeOffset() {
        return __awaiter(this, void 0, void 0, function* () {
            const start = Date.now();
            try {
                const response = yield this.getServerTime();
                const result = new Date(response.result).getTime();
                const end = Date.now();
                return Math.ceil(result - end + ((end - start) / 2));
            }
            catch (e) {
                return 0;
            }
        });
    }
}
exports.RestClient = RestClient;
;
//# sourceMappingURL=rest-client.js.map