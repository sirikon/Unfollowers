#!/usr/bin/env bash
docker build -t unfollowers .
docker save -o unfollowers.tar unfollowers
zip -r artifact ./unfollowers.tar
curl -F artifact=@./artifact.zip -F project=$MOLLY_PROJECT -F token=$MOLLY_TOKEN $MOLLY_URL"/deploy"
