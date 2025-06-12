import { createLogger, format, transports, Logger, addColors } from 'winston';

interface Meta {
  req: {
    body: unknown;
  };
  res: {
    body: unknown;
    statusCode: unknown;
  };
}

const logsDir = './logs/';

const formatters = [format.timestamp(), format.json()];

const loggerRequestTransports: transports.StreamTransportInstance[] = [
  new transports.File({
    level: 'error',
    filename: `${logsDir}requestErrors.log`,
    handleExceptions: true,
    handleRejections: true,
  }),
];

if (process.env.NODE_ENV !== 'production') {
  formatters.push(format.prettyPrint());
  loggerRequestTransports.push(
    new transports.File({
      level: 'info',
      filename: `${logsDir}requestInfo.log`,
    }),
    new transports.File({
      level: 'warn',
      filename: `${logsDir}requestWarnings.log`,
    }),
    new transports.Console({
      level: 'warn',
      format: format.combine(
        ...formatters,
        format.colorize({ all: true }),
        format.printf((info) => {
          const { timestamp, message, meta } = info;

          const metaCasted = meta as Meta;

          let requestBody;
          let responseBody;

          if (metaCasted) {
            try {
              requestBody = JSON.stringify(metaCasted.req.body, null, 2);
            } catch (e) {
              requestBody = metaCasted.req.body;
            }
            try {
              responseBody = JSON.stringify(metaCasted.res.body, null, 2);
            } catch (e) {
              responseBody = metaCasted.res.body;
            }
          }

          const statusCode = metaCasted ? metaCasted.res.statusCode : null;

          return `[${timestamp}] ${message} - ${statusCode && '-'}\n\n${
            requestBody ? `Request Body: ${requestBody}\n` : ''
          }${responseBody ? `Response Body: ${responseBody}\n` : ''}`;
        }),
      ),
      handleExceptions: true,
      handleRejections: true,
    }),
  );
  addColors({
    info: 'blue',
    error: 'red',
    warn: 'yellow',
  });
}

export const requestLogger: Logger = createLogger({
  transports: loggerRequestTransports,
  format: format.combine(...formatters),
});
