FROM debian:buster
RUN apt update
RUN apt install curl -y
RUN curl -L https://unofficial-builds.nodejs.org/download/release/v14.15.0/node-v14.15.0-linux-x64-usdt.tar.gz > node.tar.gz
RUN tar xvzf node.tar.gz 
RUN cp -fr node-v14.15.0-linux-x64-usdt/* /usr/local

COPY server.js .

ENV PORT 3000
CMD ["node", "server.js"]
