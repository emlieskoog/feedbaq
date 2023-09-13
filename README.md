Hej hej detta är gjort från min lokala /emelie :-)

1. Create new EC2 instance 
- t3medium
- ubuntu
2. git clone
3. cd feedbaq-server


For the backend this repo is using java 17, to install java use the following commands
sudo apt update
sudo apt install -y openjdk-17-jdk
java -version


-install gradle with the following commands

gradle -version

curl -s "https://get.sdkman.io" | bash

source "$HOME/.sdkman/bin/sdkman-init.sh"

sdk install gradle

gradle clean build

To run the server use these commands:
cd build/libs
java -jar feedbaq-0.0.1-SNAPSHOT.jar


To get started with the frontend
navigate to feedbaq-client
npm install
npm run dev