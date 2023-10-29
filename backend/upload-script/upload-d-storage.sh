#!/bin/bash
# Change directory to build directory
cd upload-script/build

password="test"

expect << EOF
spawn ./gnfd-cmd -c config.toml object put  --contentType "image/png" --visibility public-read ./$1  gnfd://d-storage/$1
expect "password: "
send "$password\r"
expect eof


# Add a 50-second delay after running the command
sleep 70

# EOF