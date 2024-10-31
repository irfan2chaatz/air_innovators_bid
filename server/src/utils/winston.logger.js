import winston from 'winston'

const logger = winston.createLogger({
  level: 'http',
  format: winston.format.json(),
  defaultMeta: { service: 'AIR INNOVATORS Server' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log', level: 'http' }),
    new winston.transports.Console()

    //3rd party transports
  ],
});


export default logger;