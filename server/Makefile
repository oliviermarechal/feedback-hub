OS=$(shell uname)

ENV_FILE_EXISTS=$(shell [ -f .env ] && echo 1 || echo 0)
ifeq ($(ENV_FILE_EXISTS), 1)
include .env
endif

NODE_ENV?=development

start:
	@yarn start:dev

test-e2e:
	@docker-compose -f ../docker-compose-test.yaml up -d
	@yarn test:e2e