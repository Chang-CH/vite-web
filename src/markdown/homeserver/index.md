# Homeserver dev logs

### Connecting to machine on local network

1. determine machine's ip (usually `192.168.1.XX`)
   1. windows: `ipconfig`, see IPv4 addr of adapter
   2. linux: `ifconfig` (or `ip -d address`), see `wlo1` inet
2. run express app, e.g. on port 5000
3. on second machine, use postman, `GET 192.168.1.XX:5000/endpoint`.

### Getting IP of machine with known hostname

1. check hostname of remote: `hostname` (configure with `sudo hostnamectl set-hostname ...`)
2. on client: `ping $HOSTNAME -4`, returns ping details

```sh
@echo off
 title Display your IP and hostname
 color F9
 @echo -
 for /f "tokens=2 delims=:" %%i in ('ipconfig^|findstr "Address"') do set ip=%%i
 @echo Your ip address is :%ip%
 @echo Your computer name is :%COMPUTERNAME%
Echo press any key to exit...
pause>NUL
```
