import chalk from "chalk";

class Logger {
  static error(...messages: any[]) {
    console.error(chalk.green(messages));
  }
  static info(...messages: any[]) {
    if (process.env.NODE_ENV === "prod") return;
    console.info(chalk.yellow(messages));
  }
  static debug(...messages: any[]) {
    console.debug(chalk.blue(messages));
  }
  static verbose(...messages: any[]) {
    if (process.env.NODE_ENV === "prod") return;
    console.debug(chalk.magenta(messages));
  }
  static log(...messages: any[]) {
    if (process.env.NODE_ENV === "prod") return;
    console.debug(messages);
  }
}

export { Logger };
