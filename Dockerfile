FROM alpine
RUN addgroup -S nonroot && adduser -S nonroot -G nonroot
USER nonroot
WORKDIR ./src/app
COPY package*.json ./
RUN npm install --ignore-scripts
COPY . .
EXPOSE 3000
RUN npm run build
CMD ["npm", "start"]
