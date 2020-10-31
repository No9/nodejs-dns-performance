# nodejs-dns-performance
A sample node app based on node USDT build to demonstrate per request DNS performance.

This is a work in process to support a future blog post on https://venshare.com/

## simple usage

1. On a linux machine install bpftrace.
    https://github.com/iovisor/bpftrace/blob/master/INSTALL.md 

2. Download and unzip the unofficial USDT build
    https://unofficial-builds.nodejs.org/download/release/v14.15.0/
    ```
    $ curl -L https://unofficial-builds.nodejs.org/download/release/v14.15.0/node-v14.15.0-linux-x64-usdt.tar.gz > node.tar.gz
    $ tar xvzf node.tar.gz
    ```
3. Run the server.js in this folder with the build
    ```
    ./v14.15.0/node-v14.15.0-linux-x64-usdt/bin/node server.js
    ```

4. Attach the bpf script to the node process select the correct one for your OS.
    If a script isn't available see [modifying the bt script](#modifying-the-bt-script) below.
    ```
    $ sudo bpftrace -p $(pgrep node) dns-trace-fedora.bt     
    ```
5. Run some load on the server this uses Apache bench but you can also open a browser
    ```
    ab -n10 http://localhost:3000/
    ```

6. In the script screen you should see content similar too
    ```
    Attaching 8 probes...
    01:16:38  GET 127.0.0.1/
    DNS Lookup skateipsum.com 12203     211 ms 
    DNS Lookup www.random.org 12203      22 ms 
    Total Request Time:    555 ms 
    ...
    ```

## kubernetes usage

TODO.

## modifying the bt script

The script attaches to the uprobes in libc. This is dependant on the location of libc.so.6 on your linux machine.
libc.so.6 is usually in your `/usr` folder and can be found with
```
$ sudo find /usr -name libc.so.6 
```
Once you have the location update the `uprobe:` definintions in the bt file with the correct location.
