#!/bin/bash

git pull origin main --allow-unrelated-histories
# Configuração do usuário (adicione estas linhas)
git config --local user.email "Vitorvzp722@gmail.com"
git config --local user.name "Vitorvzp"

git add .
git commit -m "Atualização em $(date +'%d/%m/%Y %H:%M')"
git push origin main

echo "✅ Site atualizado no GitHub Pages!"
