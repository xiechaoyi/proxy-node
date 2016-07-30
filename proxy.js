var dns = require('dns');
var proxy = require('http-proxy').createProxyServer({});
proxy.on(function(err,req,res){
	res.writeHead(500,{'Content-Type':'text/plain'});
});
var hostEndPort = {};
require('http').createServer(function(req,res){
	var host = req.headers.host;
	var nowtime = Math.round(new Date().getTime()/1000);
	if(!hostEndPort[host] || !hostEndPort[host].Expires || hostEndPort[host].Expires < nowtime){
		if(process.env[host]){
			if(!hostEndPort[host]){

			}
			hostEndPort[host] = {EndPort:process.env[host],Expires:nowtime + 86400};
		}else{
			console.log('host:'+host+' endport not found!');
			hostEndPort[host] = {EndPort:'',Expires:nowtime + 30};
		}
	}
	if(hostEndPort[host].EndPort){
		proxy.web(req,res,{target:'http://'+hostEndPort[host].EndPort});
	}else{
		res.writeHead(200, {'Content-Type': 'text/html','WlniaoServer':'proxy-node'});
		res.end("<html><head><title>Unknown Domain</title></head><body bgcolor=\"white\"><center><h1>Unknown Domain</h1></center><hr><center>proxy</center></body></html>");
	}
}).listen(80);
console.log("node proxy listening on port 80");