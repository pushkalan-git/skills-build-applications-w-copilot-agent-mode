import mongoose from 'mongoose';

const DEFAULT_DB_NAME = 'octofit_db';

const isMongoUri = (uri: string): boolean => uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://');

const ensureDatabaseName = (uri: string): string => {
  if (!isMongoUri(uri)) {
    return uri.endsWith('/') ? `${uri}${DEFAULT_DB_NAME}` : `${uri}/${DEFAULT_DB_NAME}`;
  }

  try {
    const parsed = new URL(uri);
    if (parsed.pathname && parsed.pathname !== '/') {
      return uri;
    }

    parsed.pathname = `/${DEFAULT_DB_NAME}`;
    return parsed.toString();
  } catch {
    const normalized = uri.replace(/\/+$/, '');
    return normalized.includes('/') ? `${normalized}/${DEFAULT_DB_NAME}` : `${normalized}/${DEFAULT_DB_NAME}`;
  }
};

const rawUri = process.env.MONGODB_URI ?? `mongodb://127.0.0.1:27017/${DEFAULT_DB_NAME}`;
export const MONGODB_URI = ensureDatabaseName(rawUri);

mongoose.connection.on('connected', () => {
  console.log(`MongoDB connected to ${DEFAULT_DB_NAME}`);
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

export const connectDatabase = async (): Promise<typeof mongoose> => {
  try {
    await mongoose.connect(MONGODB_URI, {
      family: 4,
      serverSelectionTimeoutMS: 5000,
    });
    return mongoose;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};

export { mongoose };
