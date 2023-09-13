# Set up the project to your local machine

## Download VSCode
1. From this link: https://code.visualstudio.com/download
2. Download the WSL extension i vscode
3. Restart your computer
4. Open a new bash terminal

## Install python
```
sudo apt install python
```
And synchronizing the system time on the Linux system using NTP: 
```
sudo apt-get install ntpdate
```
```
sudo ntpdate -s time.nist.gov
```

## Install AWS CLI
```
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
```
```
unzip awscliv2.zip
```
```
sudo ./aws/install
```

## Configure AWS SSO
```
aws configure sso
```
With the following settings:
```
sso_session = wale

sso_account_id = DITT ACCOUNT ID

sso_role_name = default

region = eu-west-1

sso_start_url = https://d-c3672dcef0.awsapps.com/start#

sso_registration_scopes = sso:account:access
```

Now identify yourself:
```
aws s3 ls --profile default
```
## Install codecommit
```
sudo pip install git-remote-codecommit
```

## Configure you git username and email
```
git config --global user.email "you@example.com"
```
```
git config --global user.name "Your Name"
```
## Clone the repo
```
git clone codecommit::eu-west://feedbaq
```
## Install npm and nvm
```
sudo apt install npm
```
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

Update your terminal:
```
source ~/.bashrc
```
And updatera to node 16
```
nvm install 16
```
```
nvm use 16
```

All done, yey!