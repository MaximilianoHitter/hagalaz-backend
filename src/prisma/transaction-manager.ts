// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TransactionContext {
}

export interface TransactionManager {
    runInTransaction<T>(
        callback: (context: TransactionContext) => Promise<T>,
    ): Promise<T>;
}

export const TRANSACTION_MANAGER = Symbol('TRANSACTION_MANAGER');