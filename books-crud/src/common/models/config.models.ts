export interface App {
    protocol: string,
    host: string,
    port: number,
    name: string,
    health: HealthObject
}

interface HealthObject {
    enablePeriodicCheck?: boolean,
    disk: {
        key: string,
        threshold: number,
        path: string
    },
    memory: {
        heapKey: string,
        heapThreshold: number,
        rssKey: string,
        rssThreshold: number
    }
}

export interface Log {
    app: {
        level?: string,
        directoryMount?: string,
        subDirectory?: string,
        filePrefix?: string,
        errorFilePrefix?: string,
        dateParttern?: string,
        maxSize?: string,
        maxFile?: string,
        zippedArchive?: boolean,
    }
}