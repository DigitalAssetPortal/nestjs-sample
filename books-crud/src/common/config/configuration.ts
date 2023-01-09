export default () => ({
    app: {
        host: process.env.APP_HOST || '0.0.0.0',
        port: parseInt(process.env.APP_PORT, 10) || 3000,
        protocol: process.env.APP_PROTOCOL || 'http',
        name: process.env.APP_NAME || 'books-crud',
        health: {
            enablePeriodicCheck: (process.env.ENABLE_PERIODIC_HEALTH_CHECK === 'true') || false,
            disk: {
                key: process.env.DISK_HEALTH_KEY || 'ms-disk',
                threshold: parseFloat(process.env.DISK_HEALTH_THRESHOLD) || 0.9,
                path: process.env.DISK_HEALTH_PATH || 'C:\\'
            },
            memory: {
                heapKey: process.env.MEMORY_HEALTH_HEAP_KEY || 'memory_heap',
                heapThreshold: parseInt(process.env.MEMORY_HEALTH_HEAP_THRESHOLD, 10) || 150 * 1024 * 1024,
                rssKey: process.env.MEMORY_HEALTH_RSS_KEY || 'memory_rss',
                rssThreshold: parseInt(process.env.MEMORY_HEALTH_RSS_THRESHOLD, 10) || 150 * 1024 * 1024
            }
        },
        error: {
            enableStack: (process.env.ENABLE_ERROR_STACK === 'true') || false,
        }
    },
    log: {
        app: {
            level: process.env.APP_LOG_LEVEL || 'info',
            directoryMount: process.env.LOGS_DIRECTORY_MOUNT || 'logs',
            subDirectory: process.env.LOGS_SUB_DIRECTORY || '',
            filePrefix: process.env.LOGS_FILE_PREFIX || 'combined',
            errorFilePrefix: process.env.LOGS_ERROR_FILE_PREFIX || 'error',
            dateParttern: process.env.LOGS_DATEPATTERN || 'MM-DD-YYYY',
            maxSize: process.env.LOGS_FILE_MAXSIZE || '100m',
            maxFile: process.env.LOGS_FILE_MAXFILE || '30d',
            zippedArchive: (process.env.LOGS_ZIPPED_ARCHIVE === 'true') || true,
        }
    },
    cache: {
        ttl: parseInt(process.env.CACHE_TTL, 10) || 300, // seconds ~ ttl 5 minutes
        maxCount: parseInt(process.env.CACHE_MAX_ENTRIES, 10) || 100, // count ~ maximum number of items in cache
    },
    database: {
        mongodb: {
            uri: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?replicaSet=dbrs&directConnection=true`,
            useNewUrlParser: (process.env.MONGO_NEW_URL_PARSER === 'true') || true,
            useUnifiedTopology: (process.env.MONGO_UNIFIED_TOPOLOGY === 'true') || true,
            serverSelectionTimeoutMS: parseInt(process.env.MONGO_SERVER_SELECTION_TIMEOUT, 10) || 50,
            connectTimeoutMS: parseInt(process.env.MONGO_CONNECT_TIMEOUT, 10) || 50
        }
    }
});

export const config = {
    error: {
        enableStack: (process.env.ENABLE_ERROR_STACK === 'true') || false,
        enableStackLog: (process.env.ENABLE_ERROR_STACK_LOG === 'true') || true
    }
}

export const CONSTANTS = {
    MESSAGE: 'message',
    ENV: {
        NODE: 'NODE_ENV',
        DEVELOPMENT: 'development',
        PRODUCTION: 'production',
    },
    CONFIG: {
        APP: 'app',
        HOST: 'app.host',
        PORT: 'app.port',
        LOG: 'log',
        DATABASE: 'database'
    },
    ROUTES: {
        BASE: '',
        API: 'api',
        GET: 'GET',
        HEALTH: {
            CONTROLLER: 'health',
            TAG: 'status'
        }
    },
    AUTH: {
        HEADER: {
            STRATEGY: 'api-key',
            KEY: 'X-Service-Key'
        }
    },
    LOG: {
        LABEL: 'books-crud',
        ERROR_LOG_FIELD: 'log'
    },
    SWAGGER: {
        DOCS: 'docs',
        TITLE: 'API Docs',
        HEADER: 'SOME API',
        DESCRIPTION: 'API - Description',
        VERSION: 'v1',
        TAG: 'tag'
    }
}