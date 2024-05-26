FROM nikolaik/python-nodejs:python3.9-nodejs20
COPY . .
RUN yarn install-all
CMD ["yarn", "start"]
EXPOSE 3000