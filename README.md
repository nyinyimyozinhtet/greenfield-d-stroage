# greenfield-d-stroage
Simple Dapp upload image files on bnb greenfield decentralize storage using shellscript


## How to initialize the project
#### Prerequisites
- [Golang](https://go.dev/doc/install) (version 1.20.5 or higher)

#### Installation
1. Download and install Golang from the official download page.
2. Verify the installation by running the following command in your terminal:

```bash
go version
```
If the installation is correct. It should show like this.

```bash
go version go1.20.5 darwin/arm64
```
- [Node.js](https://nodejs.org/en/download) (LTS version)

#### Installation
1. Download and install Node.js from the official download page.
2. Verify the installation by running the following command in your terminal:

```bash
node --version
```

If the installation is correct. It should show like this.

```bash
v16.20.0
```

## Clone Dapp repository

```bash
git clone https://github.com/nyinyimyozinhtet/greenfield-d-stroage.git
```

### Setup greenfield environment
#### Clone greenfield-cmd repository

```bash
git clone https://github.com/bnb-chain/greenfield-cmd.git

cd greenfield-cmd

make build

cd build
```

Copy ```gnfd-cmd``` from ```greenfield-cmd/build/``` into ```/greenfield-d-storage/backend/upload-script/build``` 

Go to ```/greenfield-d-storage/backend/upload-script/build``` diractory via terminal or commandline and run this command:
```bash
./gnfd-cmd account import key.txt
```
After you run the command you will see ```Please enter the passphrase now:```. In this case put ```test``` as passphase and press ```enter```.

## Start DApp
### Backend
1. Go to the backend directory via terminal or commandline.
2. Run the following command to install dependencies:
```bash
go mod tidy
```
3. Run backend server:
```bash
go run main.go
```
### Frontend
1. Go to the front directory via terminal or commandline.
2. Run the following command to install dependencies:
```bash
npm i
```
3. Run frontend server
```bash
npm start
```

# It should finnally boot up frontend web that can upload file and wait for transaction that uploaded on bnb greenfield decentralize storage

