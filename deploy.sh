# scp -i "ubuntu.pem" -r /Users/jaypan/workspace/nginx/client/build ubuntu@ec2-15-168-39-19.ap-northeast-3.compute.amazonaws.com:/var/www/html/

rm -rf dist
pnpm run build
ssh root@ecs "rm -rf /home/stock/*"
scp -r dist/* root@ecs:/home/stock/