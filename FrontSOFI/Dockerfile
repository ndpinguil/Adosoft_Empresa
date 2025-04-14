# Etapa de construcción
FROM node:18 AS build

WORKDIR /app
COPY . .  
RUN npm install
RUN npm run build  # Construye la aplicación

# Etapa de ejecución
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html  

EXPOSE 80  
CMD ["nginx", "-g", "daemon off;"]

