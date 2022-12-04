import DataProvider from './dataProvider';
import { AsyncFunction, DataProviderRequestProps, AsyncReturnType, AsyncStatus } from './interfaces';
export declare const useDataProvider: <T extends AsyncFunction>(asyncFn: T, immediate?: boolean, callbacks?: DataProviderRequestProps, arg?: unknown) => {
    execute: (_arg?: unknown) => Promise<void>;
    status: AsyncStatus;
    isPending: boolean;
    data: AsyncReturnType<T>;
    error: unknown;
    refresh: () => Promise<void>;
};
export default DataProvider;
