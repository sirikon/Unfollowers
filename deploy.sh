#!/usr/bin/env bash
zip -r artifact.zip \
    controllers\
    helpers\
    middlewares\
    models\
    repositories\
    services\
    static\
    utils\
    views\
    app.js\
    routes.js\
    package.json
curl -F artifact=@./artifact.zip -F project=$MOLLY_PROJECT -F token=$MOLLY_TOKEN $MOLLY_URL"/deploy"
