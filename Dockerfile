FROM node:12.3.0

#执行命令，创建文件夹

RUN mkdir -p /home/Service

WORKDIR /home/Service


COPY . /home/Service

RUN npm install

EXPOSE 3000


CMD ["npm","start"]
