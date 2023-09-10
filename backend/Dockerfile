# С помощью директивы AS можно дать образу имя
FROM node:16-alpine AS builder
WORKDIR /var/www/app
COPY package*.json ./
# Устанавливаем зависимости
RUN npm i
# Копируем исходный код и собираем приложение
COPY . .
RUN npm run build

FROM node:16-alpine as production
WORKDIR /var/www/app
# С помощью параметера --from указываем, что копировать нужно из образа builder
# Копируем package.json и package-lock.json (потребуются для установки зависимостей)
COPY --from=builder /var/www/app/package*.json ./
# Устанавливаем только зависимости, необходимые в продакшене
# --omit=dev означает пропустить dev-зависимости
RUN npm i --omit=dev
# Копируем директорию со сборкой приложения
COPY --from=builder /var/www/app/dist ./dist/

# Указываем команду для запуска приложения
CMD ["node", "/dist/main.js"]