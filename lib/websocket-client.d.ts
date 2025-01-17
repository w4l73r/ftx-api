/// <reference types="node" />
import { EventEmitter } from 'events';
import { DefaultLogger } from './logger';
import { WSClientConfigurableOptions } from './util/requestUtils';
import WebSocket from 'isomorphic-ws';
export declare enum WsConnectionState {
    READY_STATE_INITIAL = 0,
    READY_STATE_CONNECTING = 1,
    READY_STATE_CONNECTED = 2,
    READY_STATE_CLOSING = 3,
    READY_STATE_RECONNECTING = 4
}
export declare const wsKeyGeneral = "ftx";
export declare interface WebsocketClient {
    on(event: 'open' | 'reconnected', listener: ({ wsKey: string, event: any }: {
        wsKey: any;
        event: any;
    }) => void): this;
    on(event: 'response' | 'update' | 'error', listener: (response: any) => void): this;
    on(event: 'reconnect' | 'close', listener: () => void): this;
}
export declare type WsChannel = 'orderbook' | 'orderbookGrouped' | 'markets' | 'trades' | 'ticker' | 'fills' | 'orders' | string;
export interface WsTopic {
    channel: WsChannel;
    grouping?: number;
    market?: string;
}
export declare class WebsocketClient extends EventEmitter {
    private logger;
    private restClient;
    private options;
    private wsStore;
    constructor(options: WSClientConfigurableOptions, logger?: typeof DefaultLogger);
    isLivenet(): boolean;
    /**
     * Add topic/topics to WS subscription list
     */
    subscribe(wsTopics: WsTopic[] | WsTopic | WsChannel[] | WsChannel): void;
    /**
     * Remove topic/topics from WS subscription list
     */
    unsubscribe(wsTopics: WsTopic[] | WsTopic | WsChannel[] | WsChannel): void;
    close(wsKey: string): void;
    /**
     * Request connection of all dependent websockets, instead of waiting for automatic connection by library
     */
    connectAll(): Promise<WebSocket | undefined>[] | undefined;
    private connect;
    private requestTryAuthenticate;
    private parseWsError;
    /**
     * Return params required to make authorized request
     */
    private getAuthParams;
    private reconnectWithDelay;
    private ping;
    private clearTimers;
    private clearPingTimer;
    private clearPongTimer;
    /**
     * Send WS message to subscribe to topics.
     */
    private requestSubscribeTopics;
    /**
     * Send WS message to unsubscribe from topics.
     */
    private requestUnsubscribeTopics;
    private tryWsSend;
    private connectToWsUrl;
    private onWsOpen;
    private onWsMessage;
    private onWsError;
    private onWsClose;
    private onWsMessageResponse;
    private onWsMessageUpdate;
    private getWs;
    private setWsState;
    private getWsKeyForTopic;
}
