FROM ubuntu:latest
LABEL maintainer="Paulo Careli"

ENV PYTHONUNBUFFERED 1
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get --assume-yes update && apt-get --assume-yes upgrade
RUN apt-get --assume-yes install python3 \
    python3-dev \
    python3-pip \
    libpq-dev \
    libmysqlclient-dev \
    postgresql-client 

WORKDIR /usr/app
COPY ./requirements.txt ./

RUN pip3 install --upgrade pip setuptools wheel
RUN pip3 install -r ./requirements.txt

COPY ./ ./

RUN chmod +x ./scripts/*

RUN useradd admin
RUN chown -R admin:admin ./
USER admin

EXPOSE 8080

ENTRYPOINT ["sh", "./scripts/entrypoint.sh", --reload]
