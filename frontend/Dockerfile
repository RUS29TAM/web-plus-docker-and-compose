# С помощью директивы AS можно дать образу имя
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Устанавливаем зависимости
RUN npm i
# Копируем исходный код и собираем приложение
COPY . .
RUN npm run build

FROM nginx:1.23.1-alpine AS production
COPY --from=builder /app/build /usr/share/nginx/html/
COPY ./nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80

# Указываем команду для запуска приложения
CMD ["nginx", "-g", "daemon off;"]