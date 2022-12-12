#!/bin/bash

### GIT FILTER-REPO ###

## NÃO EXECUTE ESSE SCRIPT DIRETAMENTE
## Esse script foi feito para uso do
## script 'trybe-publisher' fornecido 
## pela Trybe. 

CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NO_COLOR='\033[0m'

echo -e "${BR}${RED}Para limpar corretamente os arquivos do projeto Trybe Wallet, precisamos saber qual a sua turma.${NO_COLOR}${BR}"
echo -e "\t${CYAN}A${NO_COLOR} = sua Turma é 21 ou mais ${CYAN}Antiga${NO_COLOR} (ex: 21, 20, 19, XP, 17...).${NO_COLOR}${BR}"
echo -e "\t${CYAN}R${NO_COLOR} = sua Turma é 22 ou mais ${CYAN}Recente${NO_COLOR} (ex: 22, 23, 24, 25, 26...).${NO_COLOR}${BR}"
REPLY=" "
while ! [[ $REPLY =~ ^[RrAa]$ ]]
do 
    read -p "A sua Turma é mais Antiga ou Recente? (A/R) " -n 1 -r
    if ! [[ $REPLY =~ ^[RrAa]$ ]]; then
        echo 
        echo 
        echo -e "${YELLOW}Opção ${NO_COLOR}${REPLY}${YELLOW} desconhecida."
        echo -e "${CYAN}Escolha ${NO_COLOR}A${CYAN} ou ${NO_COLOR}R${CYAN}."
        echo
    fi
done
echo
echo "- - - - - - - - - - - - - - - - - -"

if [[ $REPLY =~ ^[Rr]$ ]]; then 
    echo -e "${BR}${YELLOW}Realizando limpeza para Turma 22 ou mais Recente.${NO_COLOR}${BR}"
    [[ $# == 1 ]] && \
    [[ $1 == "trybe-security-parameter" ]] && \
    git filter-repo \
        --path .trybe \
        --path .github \
        --path trybe.yml \
        --path trybe-filter-repo.sh \
        --path cypress \
        --path imgs \
        --path cypress.config.js \
        --path reporter.json \
        --path README.md \
        --invert-paths --force --quiet
else
    echo -e "${BR}${YELLOW}Realizando limpeza para Turma 21 ou mais Antiga.${NO_COLOR}${BR}"
    [[ $REPLY =~ ^[Aa]$ ]] && \
    [[ $# == 1 ]] && \
    [[ $1 == "trybe-security-parameter" ]] && \
    git filter-repo \
        --path .trybe \
        --path .github \
        --path trybe.yml \
        --path trybe-filter-repo.sh \
        --path src/tests \
        --path addItem.gif \
        --path carteira.gif \
        --path btnEditar.gif \
        --path btnExcluir.gif \
        --path describe-only.png \
        --path login.gif \
        --path only-all-green.png \
        --path bonusDropdown.gif \
        --path deleteBtn.gif \
        --path editBtn.gif \
        --path only-one-green.png \
        --path test-only.png \
        --path README.md \
        --invert-paths --force --quiet
fi
