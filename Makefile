SHELL = /bin/bash
.DEFAULT_GOAL := all

.PHONY: all
all: provision test clean

.PHONY: provision
provision:
	@docker-compose up -d hub chrome firefox

.PHONY: clean
clean:
	@docker-compose down --rmi all

.PHONY: test
test:
	@docker-compose up --build wdio
