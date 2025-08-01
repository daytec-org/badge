import { joinPaths, fileExists, readTextFile } from './fs.ts';

type TLoggerType = 'file' | 'memory'

const LOG_TYPE = (Deno.env.get("LOG_TYPE") || 'memory') as TLoggerType
const FILE_SIZE = parseInt(Deno.env.get("LOG_FILE_SIZE") || "1024", 10);
const LOG_LEVEL = Deno.env.get("LOG_LEVEL") || "info";
const MAX_LOG_COUNT = 1024

export const logLevels = ["error", "warn", "info", "http", "debug", "trace"];
export type TLogLevel = "error" | "warn" | "info" | "http" | "debug" | "trace";

class LogRotation {
  private readonly maxFileSizeKB: number;
  private readonly maxBackupFiles: number;
  private readonly logDir: string;

  constructor(logDir: string, maxFileSizeKB: number = 1024, maxBackupFiles: number = 5) {
    this.logDir = logDir;
    this.maxFileSizeKB = maxFileSizeKB;
    this.maxBackupFiles = maxBackupFiles;
    Deno.stat(this.logDir).catch(() => Deno.mkdir(this.logDir, { recursive: true }));
  }

  private getBackupFiles(baseName: string): string[] {
    const files = [];
    for (let i = 1; i <= this.maxBackupFiles; i++) {
      files.push(joinPaths(this.logDir, `${baseName}.${i}`));
    }
    return files;
  }

  private getFileSize = (path: string): Promise<number> => Deno.stat(path).then(s => s.size).catch(() => 0)

  private shouldRotate = (path: string): Promise<boolean> => this.getFileSize(path).then(size => size / 1024 >= this.maxFileSizeKB)

  async handleRotation(logPath: string): Promise<void> {
    if (await this.shouldRotate(logPath)) {
      await this.rotateFile(logPath);
    }
  }

  private async rotateFile(logPath: string): Promise<void> {
    const baseName = logPath.split("/").pop()!;
    const backups = this.getBackupFiles(baseName);

    await Deno.remove(backups[backups.length - 1]).catch(() => { });

    for (let i = backups.length - 1; i > 0; i--) {
      if (await fileExists(backups[i - 1])) {
        await Deno.rename(backups[i - 1], backups[i]).catch(() => { });
      }
    }

    if (await fileExists(logPath)) {
      await Deno.rename(logPath, backups[0]).catch(() => { });
    }
  }
}

export class FileLogger {
  private logRotation: LogRotation;
  private logLevel: number;

  constructor() {
    const logDir = joinPaths(Deno.cwd(), "logs");
    this.logRotation = new LogRotation(logDir, FILE_SIZE, 3);
    this.logLevel = logLevels.includes(LOG_LEVEL as TLogLevel) ? logLevels.indexOf(LOG_LEVEL as TLogLevel) : 2;
  }

  public setLevel(level: TLogLevel) {
    if (logLevels.includes(level)) {
      this.logLevel = logLevels.indexOf(level);
    }
  }

  public async log(level: TLogLevel, message: string): Promise<void> {
    if (logLevels.indexOf(level) > this.logLevel) return;

    const logPath = joinPaths(Deno.cwd(), "logs", `${level}.log`);
    await this.logRotation.handleRotation(logPath);

    await Deno.writeTextFile(logPath, `${message}\n`, { append: true }).catch(() => { });
  }

  public async get(level: string) {
    const logPath = joinPaths(Deno.cwd(), "logs", `${level}.log`);

    if (!await fileExists(logPath)) {
      return "Log file not found"
    }

    return readTextFile(logPath);
  }
}

class MemoryLogger {
  private logs: Partial<Record<TLogLevel, string[]>> = {}

  public log(level: TLogLevel, message: string) {
    if (!this.logs[level]) {
      this.logs[level] = [message]
    } else {
      this.logs[level].push(message)
      if (this.logs[level].length > MAX_LOG_COUNT) {
        this.logs[level].splice(0, 1)
      }
    }
  }

  public get(level: TLogLevel) {
    if (this.logs[level]) {
      return this.logs[level].join('\n')
    }

    return 'No logs'
  }
}

class Logger {
  private logger: FileLogger | MemoryLogger

  constructor(type: TLoggerType) {
    this.logger = type === 'file' ? new FileLogger() : new MemoryLogger()
  }

  public log(level: TLogLevel, message: string) {
    this.logger.log(level, message)
  }

  public get(level: string) {
    if (!logLevels.includes(level)) {
      return "Invalid log level"
    }

    return this.logger.get(level as TLogLevel)
  }
}

export const logger = new Logger(LOG_TYPE)
